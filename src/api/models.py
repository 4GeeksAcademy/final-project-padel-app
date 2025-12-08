from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

# ---------------------------------------------------
# USERS TABLE
# ---------------------------------------------------

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    firstname = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    gender = db.Column(db.String(30))
    phone = db.Column(db.String(20))
    age = db.Column(db.String(10))
    profile_photo = db.Column(db.String(500))
    bio = db.Column(db.String(200))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    city = db.Column(db.String(100))

    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())
    deleted_at = db.Column(db.DateTime)

    # Relaciones
    organized_matches = db.relationship("Match", backref="organizer", foreign_keys="Match.organized_id")
    match_participations = db.relationship("MatchUser", back_populates="user")

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "email": self.email,
            "gender": self.gender,
            "phone": self.phone,
            "age": self.age,
            "profile_photo": self.profile_photo,
            "bio": self.bio,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "city": self.city
        }


# ---------------------------------------------------
# COURTS TABLE
# ---------------------------------------------------

class Court(db.Model):
    __tablename__ = "courts"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    address = db.Column(db.String(100))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    city = db.Column(db.String(50))
    type = db.Column(db.String(10))
    phone = db.Column(db.String(20))

    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())
    deleted_at = db.Column(db.DateTime)

    matches = db.relationship("Match", backref="court")


# ---------------------------------------------------
# MATCHES TABLE
# ---------------------------------------------------

class Match(db.Model):
    __tablename__ = "matches"

    id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.Date)
    time = db.Column(db.Time)
    created_at = db.Column(db.DateTime, default=db.func.now())
    contact_phone = db.Column(db.String(50))
    description = db.Column(db.String(500))
    status = db.Column(db.Boolean, default=True)

    court_id = db.Column(db.Integer, db.ForeignKey("courts.id"))
    organized_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    type = db.Column(db.Integer)

    players = db.relationship("MatchUser", back_populates="match")


# ---------------------------------------------------
# MATCHES_USERS TABLE (Many-to-many)
# ---------------------------------------------------

class MatchUser(db.Model):
    __tablename__ = "matches_users"

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    match_id = db.Column(db.Integer, db.ForeignKey("matches.id"), primary_key=True)
    is_organized = db.Column(db.Boolean, default=False)

    user = db.relationship("User", back_populates="match_participations")
    match = db.relationship("Match", back_populates="players")

    def serialize(self):
        return {
            "user_id": self.user_id,
            "match_id": self.match_id,
            "is_organized": self.is_organized
        }
