from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, Match
from api.utils import APIException
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import CORS
import datetime

api = Blueprint('api', __name__)

# === CORS DEBE IR JUSTO DESPUÉS DEL BLUEPRINT ===
CORS(api, resources={r"/*": {
    "origins": "https://improved-fishstick-jj9qrgr5xqwv2pqp-3000.app.github.dev",
    "supports_credentials": True
}})

# ------------ ENDPOINTS -----------------


@api.route('/user/me', methods=['GET'])
@jwt_required()
def get_user_me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify(user.serialize()), 200


@api.route('/user/matches', methods=['GET'])
@jwt_required()
def get_user_matches():
    user_id = get_jwt_identity()
    matches = Match.query.filter_by(user_id=user_id).all()
    return jsonify([m.serialize() for m in matches]), 200


@api.route('/user/match', methods=['POST'])
@jwt_required()
def create_match():
    user_id = get_jwt_identity()
    data = request.json

    match = Match(
        user_id=user_id,
        resultado=data.get("resultado"),
        companero=data.get("compañero"),
        rivales=",".join(data.get("rivales")),
        fecha=datetime.date.today()
    )

    db.session.add(match)
    db.session.commit()
    return jsonify({"msg": "Partido registrado"}), 201


@api.route('/user/stats', methods=['GET'])
@jwt_required()
def user_stats():
    user_id = get_jwt_identity()
    matches = Match.query.filter_by(user_id=user_id).all()

    total = len(matches)
    victorias = sum(1 for m in matches if "ganado" in m.resultado.lower())
    derrotas = total - victorias

    stats = {
        "total_partidos": total,
        "victorias": victorias,
        "derrotas": derrotas,
        "ratio": victorias / total if total > 0 else 0
    }

    return jsonify(stats), 200


@api.route('/hello', methods=['GET'])
def hello_endpoint():
    return jsonify({"message": "Hello from backend"}), 200
