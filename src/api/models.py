from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

# ------------------------------------
# USER MODEL
# ------------------------------------
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    username = db.Column(db.String(120), nullable=False)
    avatar = db.Column(db.String(300))  # Foto de perfil opcional

    # Relación → un usuario tiene muchos partidos
    matches = db.relationship("Match", backref="user", lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "avatar": self.avatar,
            "total_matches": len(self.matches)
        }


# ------------------------------------
# MATCH MODEL (DEBE ESTAR FUERA DE USER)
# ------------------------------------
class Match(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    resultado = db.Column(db.String(50))  # ej: "6-4 / 7-6"
    companero = db.Column(db.String(120))
    rivales = db.Column(db.String(200))  # Texto plano separado por comas
    fecha = db.Column(db.Date)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "resultado": self.resultado,
            "companero": self.companero,
            "rivales": self.rivales.split(",") if self.rivales else [],
            "fecha": str(self.fecha)
        }
