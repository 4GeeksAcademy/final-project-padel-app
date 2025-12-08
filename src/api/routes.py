from flask import Blueprint, request, jsonify
from api.models import db, User, Match, MatchUser, Court
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import datetime
from flask_cors import CORS


api = Blueprint('api', __name__)


# ------------ ENDPOINTS -----------------

"""""
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

    """
# ------------ ENDPOINTS TEMPORALES -----------------

@api.route('/user/me', methods=['GET'])
def temp_user_me():
    return jsonify({
        "id": 1,
        "username": "test_user",
        "firstname": "John",
        "lastname": "Doe",
        "email": "test@example.com",
        "city": "Madrid"
    }), 200

@api.route('/user/matches', methods=['GET'])
def temp_user_matches():
    return jsonify({
        "matches": [
            {
                "id": 1,
                "day": "2025-12-02",
                "time": "19:00",
                "description": "Partido amistoso",
                "court": "Central Court"
            },
            {
                "id": 2,
                "day": "2025-12-05",
                "time": "20:30",
                "description": "Entrenamiento",
                "court": "Training Court"
            }
        ]
    }), 200

@api.route('/user/stats', methods=['GET'])
def temp_user_stats():
    return jsonify({
        "total_matches": 12,
        "organized": 4
    }), 200

