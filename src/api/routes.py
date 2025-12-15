from flask import request, jsonify, Blueprint
from api.models import db, User, Court, Match, MatchUser
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.utils import APIException
from datetime import datetime, timedelta
import secrets
import smtplib
from email.mime.text import MIMEText
FRONTEND_URL = "https://scaling-journey-jjgpvrvqg59rcjgg7-3000.app.github.dev"

api = Blueprint('api', __name__)

# Configuración de correo
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_USER = "thebestvesionofme@gmail.com"
SMTP_PASSWORD = "gsea tpla iqeg lyib"  

@api.route('/auth/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json() or {}
    email = data.get('email')

    if not email:
        raise APIException("email es requerido", status_code=400)

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "Si el email existe, se enviará un enlace"}), 200

    token = secrets.token_urlsafe(32)
    user.reset_token = token
    user.reset_token_exp = datetime.utcnow() + timedelta(hours=1)
    db.session.commit()

    reset_link = f"{FRONTEND_URL}/reset-password/{token}"
    mensaje = f"Hola {user.firstname},\n\nPara restablecer tu contraseña, haz click en el siguiente enlace:\n{reset_link}\n\nSi no solicitaste esto, ignora el correo."

    msg = MIMEText(mensaje)
    msg['Subject'] = "Recupera tu contraseña"
    msg['From'] = SMTP_USER
    msg['To'] = user.email

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(msg)

    return jsonify({"message": "Si el email existe, se enviará un enlace"}), 200
# ======================================
# AUTH ENDPOINTS
# ======================================


@api.route('/auth/register', methods=['POST'])
def register():
    """Register a new user"""
    data = request.get_json() or {}

    email = data.get('email')
    password = data.get('password')
    username = data.get('username')
    firstname = data.get('firstname')
    lastname = data.get('lastname')

    if not email or not password:
        raise APIException('email and password required', status_code=400)
    if not username:
        raise APIException('username is required', status_code=400)
    if not firstname:
        raise APIException('firstname is required', status_code=400)
    if not lastname:
        raise APIException('lastname is required', status_code=400)

    if User.query.filter_by(email=email).first():
        raise APIException('email already registered', status_code=409)
    if User.query.filter_by(username=username).first():
        raise APIException('username already registered', status_code=409)

    user = User(
        email=email,
        username=username,
        lastname=lastname,
        firstname=firstname,
        gender=data.get('gender'),
        phone=data.get('phone'),
        age=data.get('age'),
        profile_photo=data.get('profile_photo'),
        bio=data.get('bio'),
        latitude=data.get('latitude'),
        longitude=data.get('longitude'),
        city=data.get('city'),
        is_active=True,
    )
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify(user.serialize()), 201


@api.route('/auth/login', methods=['POST'])
def login():
    """Login user and return JWT token"""
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        raise APIException('email and password required', status_code=400)

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        raise APIException('invalid credentials', status_code=401)

    token = create_access_token(identity=str(user.id))

    return jsonify({"access_token": token, "user": user.serialize()}), 200


@api.route('/me', methods=['GET'])
@jwt_required()
def me():
    """Get current logged in user info"""
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if not user:
        raise APIException('user not found', status_code=404)

    return jsonify(user.serialize()), 200


@api.route('/auth/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json() or {}
    token = data.get('token')
    new_password = data.get('password')

    if not token or not new_password:
        raise APIException("token y password son requeridos", status_code=400)

    user = User.query.filter_by(reset_token=token).first()
    if not user or not user.reset_token_exp or user.reset_token_exp < datetime.utcnow():
        raise APIException("token invalido o expirado", status_code=400)

    user.set_password(new_password)
    user.reset_token = None
    user.reset_token_exp = None
    db.session.commit()

    return jsonify({"message": "Contraseña actualizada"}), 200

# ======================================
# USERS
# ======================================


@api.route('/users', methods=['GET'])
def users_list():
    users = User.query.filter_by(deleted_at=None).all()
    return jsonify([u.serialize() for u in users]), 200


@api.route('/users/<int:user_id>', methods=['GET'])
def users_get(user_id):
    user = User.query.filter_by(id=user_id, deleted_at=None).first()
    if not user:
        raise APIException('user not found', status_code=404)
    return jsonify(user.serialize()), 200


@api.route('/users/<int:user_id>', methods=['PUT', 'PATCH'])
def users_update(user_id):
    user = User.query.filter_by(id=user_id, deleted_at=None).first()
    if not user:
        raise APIException('user not found', status_code=404)

    data = request.get_json() or {}

    for field in ['username', 'lastname', 'firstname', 'gender', 'phone', 'age', 'profile_photo', 'bio', 'latitude', 'longitude', 'city', 'is_active']:
        if field in data:
            setattr(user, field, data[field])

    if 'email' in data:
        if User.query.filter(User.email == data['email'], User.id != user.id).first():
            raise APIException('email already registered', status_code=409)
        user.email = data['email']

    if 'password' in data and data['password']:
        user.set_password(data['password'])

    db.session.commit()
    return jsonify(user.serialize()), 200


@api.route('/users/<int:user_id>', methods=['DELETE'])
def users_delete(user_id):
    user = User.query.filter_by(id=user_id, deleted_at=None).first()
    if not user:
        raise APIException('user not found', status_code=404)

    user.deleted_at = db.func.current_timestamp()
    db.session.commit()

    return jsonify({"deleted": True}), 200

# ======================================
# COURTS
# ======================================


@api.route('/courts', methods=['GET'])
def courts_list():
    courts = Court.query.filter_by(deleted_at=None).all()
    return jsonify([c.serialize() for c in courts]), 200


@api.route('/courts/<int:court_id>', methods=['GET'])
def courts_get(court_id):
    court = Court.query.filter_by(id=court_id, deleted_at=None).first()
    if not court:
        raise APIException('court not found', status_code=404)
    return jsonify(court.serialize()), 200


@api.route('/courts', methods=['POST'])
def courts_create():
    data = request.get_json() or {}
    name = data.get('name')
    address = data.get('address')

    if not name or not address:
        raise APIException('name and address are required', status_code=400)

    court = Court(
        name=name,
        address=address,
        latitude=data.get('latitude'),
        longitude=data.get('longitude'),
        city=data.get('city'),
        type=data.get('type'),
        phone=data.get('phone'),
    )

    db.session.add(court)
    db.session.commit()

    return jsonify(court.serialize()), 201


@api.route('/courts/<int:court_id>', methods=['PUT', 'PATCH'])
def courts_update(court_id):
    court = Court.query.filter_by(id=court_id, deleted_at=None).first()
    if not court:
        raise APIException('court not found', status_code=404)

    data = request.get_json() or {}

    for field in ['name', 'address', 'latitude', 'longitude', 'city', 'type', 'phone']:
        if field in data:
            setattr(court, field, data[field])

    db.session.commit()
    return jsonify(court.serialize()), 200


@api.route('/courts/<int:court_id>', methods=['DELETE'])
def courts_delete(court_id):
    court = Court.query.filter_by(id=court_id, deleted_at=None).first()
    if not court:
        raise APIException('court not found', status_code=404)

    court.deleted_at = db.func.current_timestamp()
    db.session.commit()

    return jsonify({"deleted": True}), 200

# ======================================
# MATCHES
# ======================================


@api.route('/matches', methods=['GET'])
def matches_list():
    matches = Match.query.filter_by(deleted_at=None).all()
    return jsonify([m.serialize() for m in matches]), 200


@api.route('/matches/<int:match_id>', methods=['GET'])
def matches_get(match_id):
    match = Match.query.filter_by(id=match_id, deleted_at=None).first()
    if not match:
        raise APIException('match not found', status_code=404)
    return jsonify(match.serialize()), 200


@api.route('/matches', methods=['POST'])
def matches_create():
    data = request.get_json() or {}
    court_id = data.get('court_id')
    organized_id = data.get('organized_id')

    if court_id and not Court.query.get(court_id):
        raise APIException('court not found', status_code=404)

    if organized_id and not User.query.get(organized_id):
        raise APIException('user not found', status_code=404)

    day = data.get('day')
    time = data.get('time')

    match = Match(
        day=datetime.fromisoformat(day) if day else None,
        time=datetime.fromisoformat(time) if time else None,
        contact_phone=data.get('contact_phone'),
        description=data.get('description'),
        status=data.get('status'),
        court_id=court_id,
        organized_id=organized_id,
        type=data.get('type'),
    )

    db.session.add(match)
    db.session.commit()

    return jsonify(match.serialize()), 201


@api.route('/matches/<int:match_id>', methods=['PUT', 'PATCH'])
def matches_update(match_id):
    match = Match.query.filter_by(id=match_id, deleted_at=None).first()
    if not match:
        raise APIException('match not found', status_code=404)

    data = request.get_json() or {}

    if 'court_id' in data and data['court_id'] and not Court.query.get(data['court_id']):
        raise APIException('court not found', status_code=404)

    if 'organized_id' in data and data['organized_id'] and not User.query.get(data['organized_id']):
        raise APIException('user not found', status_code=404)

    for field in ['contact_phone', 'description', 'status', 'court_id', 'organized_id', 'type']:
        if field in data:
            setattr(match, field, data[field])

    if 'day' in data:
        match.day = datetime.fromisoformat(
            data['day']) if data['day'] else None

    if 'time' in data:
        match.time = datetime.fromisoformat(
            data['time']) if data['time'] else None

    db.session.commit()

    return jsonify(match.serialize()), 200


@api.route('/matches/<int:match_id>', methods=['DELETE'])
def matches_delete(match_id):
    match = Match.query.filter_by(id=match_id, deleted_at=None).first()
    if not match:
        raise APIException('match not found', status_code=404)

    match.deleted_at = db.func.current_timestamp()
    db.session.commit()

    return jsonify({"deleted": True}), 200

# ======================================
# MATCH USERS
# ======================================


@api.route('/match_users', methods=['GET'])
def match_users_list():
    links = MatchUser.query.filter_by(deleted_at=None).all()
    return jsonify([l.serialize() for l in links]), 200


@api.route('/match_users/<int:link_id>', methods=['GET'])
def match_users_get(link_id):
    link = MatchUser.query.filter_by(id=link_id, deleted_at=None).first()
    if not link:
        raise APIException('match user not found', status_code=404)
    return jsonify(link.serialize()), 200


@api.route('/match_users', methods=['POST'])
def match_users_create():
    data = request.get_json() or {}
    user_id = data.get('user_id')
    match_id = data.get('match_id')

    if not user_id or not match_id:
        raise APIException('user_id and match_id required', status_code=400)

    if not User.query.get(user_id):
        raise APIException('user not found', status_code=404)

    if not Match.query.get(match_id):
        raise APIException('match not found', status_code=404)

    existing = MatchUser.query.filter_by(
        user_id=user_id, match_id=match_id, deleted_at=None).first()
    if existing:
        raise APIException(
            'user already linked to this match', status_code=409)

    link = MatchUser(
        user_id=user_id,
        match_id=match_id,
        is_player=data.get('is_player', True),
    )

    db.session.add(link)
    db.session.commit()

    return jsonify(link.serialize()), 201


@api.route('/match_users/<int:link_id>', methods=['PUT', 'PATCH'])
def match_users_update(link_id):
    link = MatchUser.query.filter_by(id=link_id, deleted_at=None).first()
    if not link:
        raise APIException('match user not found', status_code=404)

    data = request.get_json() or {}

    if 'user_id' in data and data['user_id'] and not User.query.get(data['user_id']):
        raise APIException('user not found', status_code=404)

    if 'match_id' in data and data['match_id'] and not Match.query.get(data['match_id']):
        raise APIException('match not found', status_code=404)

    for field in ['user_id', 'match_id', 'is_player']:
        if field in data:
            setattr(link, field, data[field])

    db.session.commit()

    return jsonify(link.serialize()), 200


@api.route('/match_users/<int:link_id>', methods=['DELETE'])
def match_users_delete(link_id):
    link = MatchUser.query.filter_by(id=link_id, deleted_at=None).first()
    if not link:
        raise APIException('match user not found', status_code=404)

    link.deleted_at = db.func.current_timestamp()
    db.session.commit()

    return jsonify({"deleted": True}), 200


@api.route('/users/<int:user_id>/matches', methods=['GET'])
def user_matches(user_id):
    user = User.query.get(user_id)
    if not user:
        raise APIException('user not found', status_code=404)

    matches = Match.query.join(MatchUser).filter(
        MatchUser.user_id == user_id, MatchUser.deleted_at == None).all()
    return jsonify([m.serialize() for m in matches]), 200


@api.route('/matches/<int:match_id>/players', methods=['GET'])
def match_players(match_id):
    match = Match.query.get(match_id)
    if not match:
        raise APIException('match not found', status_code=404)

    links = MatchUser.query.filter_by(match_id=match_id, deleted_at=None).all()
    return jsonify([l.serialize() for l in links]), 200
