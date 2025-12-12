"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_cors import CORS # Asegúrate de que flask_cors esté importado

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../dist/')

app = Flask(__name__)

# NOTA: CORS se aplica inmediatamente después de crear la instancia de Flask.

# 1. Definimos el ORIGEN del Frontend (el puerto 3000) de forma incondicional
FRONTEND_URL = "https://scaling-journey-jjgpvrvqg59rcjgg7-3000.app.github.dev"

# 2. APLICAMOS CORS AQUÍ:
# Esto soluciona el error CORS porque:
# a) Usa la URL explícita del puerto 3000.
# b) "supports_credentials: True" es NECESARIO para que JWT/Cookies funcionen.
CORS(app, resources={r"/api/*": {"origins": FRONTEND_URL, "supports_credentials": True}})
print(f"✅ CORS configurado con ÉXITO para origen: {FRONTEND_URL}")


# ========== CONFIGURACIÓN JWT ==========
app.config["JWT_SECRET_KEY"] = os.getenv("FLASK_APP_KEY", "dev-secret-key")
app.config["PROPAGATE_EXCEPTIONS"] = True

# ========== DATABASE ==========
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# ========== JWT ==========
jwt = JWTManager(app)

# ========== ADMIN / COMMANDS / ROUTES ==========
setup_admin(app)
setup_commands(app)
app.register_blueprint(api, url_prefix='/api') # Aquí se importan las rutas de api/routes.py

# ========== ERROR HANDLER ==========
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# ========== SITEMAP / STATIC ==========
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0
    return response

# ========== APP RUN ==========
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)