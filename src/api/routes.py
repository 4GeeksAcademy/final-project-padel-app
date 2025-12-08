from flask import Blueprint, request, jsonify
from api.models import db, User, Match, MatchUser, Court
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import datetime
from flask_cors import CORS


api = Blueprint('api', __name__)


# ------------ ENDPOINTS -----------------


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
