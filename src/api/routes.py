from flask import Blueprint, request, jsonify
from api.models import db, User, Match, MatchUser, Court
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import datetime


api = Blueprint('api', __name__)


CORS(api, resources={r"/*": {
    "origins": "https://improved-fishstick-jj9qrgr5xqwv2pqp-3000.app.github.dev",
    "supports_credentials": True
}})

# ------------ ENDPOINTS -----------------


# LUEGO LO QUITO ES PRUEBA PARA LOS ENDPOINTS
@api.route('/register', methods=['POST'])
def register():
    data = request.json

    if User.query.filter_by(email=data.get("email")).first():
        return jsonify({"error": "Email already exists"}), 400

    new_user = User(
        username=data.get("username"),
        firstname=data.get("firstname"),
        lastname=data.get("lastname"),
        email=data.get("email"),
        password=data.get("password")  # luego se hará hash
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created", "id": new_user.id}), 201


# LUEGO LO QUITO ES PRUEBA PARA LOS ENDPOINTS
@api.route('/login', methods=['POST'])
def login():
    data = request.json

    user = User.query.filter_by(email=data.get("email")).first()

    if user is None:
        return jsonify({"error": "User not found"}), 404

    if user.password != data.get("password"):
        return jsonify({"error": "Wrong password"}), 401

    token = create_access_token(identity=user.id)

    return jsonify({"token": token, "user_id": user.id}), 200


@api.route('/user/me', methods=['GET'])
@jwt_required()
def user_me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user.serialize()), 200


@api.route('/user/matches', methods=['GET'])
@jwt_required()
def user_matches():
    user_id = get_jwt_identity()

    relations = MatchUser.query.filter_by(user_id=user_id).all()

    matches = [{
        "id": r.match.id,
        "day": str(r.match.day),
        "time": str(r.match.time),
        "description": r.match.description,
        "court": r.match.court.name if r.match.court else None
    } for r in relations]

    return jsonify(matches), 200


@api.route('/user/stats', methods=['GET'])  # ESTADISTICAS DEL USUARIO
@jwt_required()
def user_stats():
    user_id = get_jwt_identity()

    total_matches = MatchUser.query.filter_by(user_id=user_id).count()
    organized = Match.query.filter_by(organized_id=user_id).count()

    return jsonify({
        "total_matches": total_matches,
        "organized": organized
    }), 200
