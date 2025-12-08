from flask_sqlalchemy import SQLAlchemy

from datetime import datetime

from sqlalchemy import String, Boolean, Integer, Float, DateTime, ForeignKey

from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    lastname: Mapped[str] = mapped_column(String(50), nullable=False)
    firstname: Mapped[str] = mapped_column(String(50), nullable=False)
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    gender: Mapped[str | None] = mapped_column(String(30))
    phone: Mapped[str | None] = mapped_column(String(20))
    age: Mapped[int | None] = mapped_column(Integer)
    profile_photo: Mapped[str | None] = mapped_column(String(500))
    bio: Mapped[str | None] = mapped_column(String(200))
    latitude: Mapped[float | None] = mapped_column(Float)
    longitude: Mapped[float | None] = mapped_column(Float)
    city: Mapped[str | None] = mapped_column(String(100))
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=db.func.current_timestamp())
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime)
    
    organized_matches: Mapped[list["Match"]] = relationship("Match", back_populates="organized", foreign_keys="Match.organized_id")
    match_links: Mapped[list["MatchUser"]] = relationship("MatchUser", back_populates="user")
    
    def __repr__(self):
        return f"<User {self.username}>"
    
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "gender": self.gender,
            "phone": self.phone,
            "age": self.age,
            "profile_photo": self.profile_photo,
            "bio": self.bio,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "city": self.city,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "deleted_at": self.deleted_at.isoformat() if self.deleted_at else None,
        }
    
    def set_password(self, password):
        from werkzeug.security import generate_password_hash
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        from werkzeug.security import check_password_hash
        return check_password_hash(self.password, password)

class Court(db.Model):
    __tablename__ = "courts"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    address: Mapped[str] = mapped_column(String(100), nullable=False)
    latitude: Mapped[float | None] = mapped_column(Float)
    longitude: Mapped[float | None] = mapped_column(Float)
    city: Mapped[str | None] = mapped_column(String(50))
    type: Mapped[str | None] = mapped_column(String(10))
    phone: Mapped[str | None] = mapped_column(String(20))
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=db.func.current_timestamp())
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime)
    
    matches: Mapped[list["Match"]] = relationship("Match", back_populates="court")
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "city": self.city,
            "type": self.type,
            "phone": self.phone,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "deleted_at": self.deleted_at.isoformat() if self.deleted_at else None,
        }

class Match(db.Model):
    __tablename__ = "matchs"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    day: Mapped[datetime | None] = mapped_column(DateTime)
    time: Mapped[datetime | None] = mapped_column(DateTime)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=db.func.current_timestamp())
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime)
    contact_phone: Mapped[str | None] = mapped_column(String(50))
    description: Mapped[str | None] = mapped_column(String(500))
    status: Mapped[bool | None] = mapped_column(Boolean())
    court_id: Mapped[int | None] = mapped_column(Integer, ForeignKey("courts.id"))
    organized_id: Mapped[int | None] = mapped_column(Integer, ForeignKey("users.id"))
    type: Mapped[str | None] = mapped_column(String(50))
    
    court: Mapped["Court"] = relationship("Court", back_populates="matches")
    organized: Mapped["User"] = relationship("User", back_populates="organized_matches")
    users: Mapped[list["MatchUser"]] = relationship("MatchUser", back_populates="match")
    
    def serialize(self):
        return {
            "id": self.id,
            "day": self.day.isoformat() if self.day else None,
            "time": self.time.isoformat() if self.time else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "deleted_at": self.deleted_at.isoformat() if self.deleted_at else None,
            "contact_phone": self.contact_phone,
            "description": self.description,
            "status": self.status,
            "court_id": self.court_id,
            "organized_id": self.organized_id,
            "type": self.type,
        }

class MatchUser(db.Model):
    __tablename__ = "matchs_users"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False)
    match_id: Mapped[int] = mapped_column(Integer, ForeignKey("matchs.id"), nullable=False)
    is_player: Mapped[bool] = mapped_column(Boolean(), default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=db.func.current_timestamp())
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime)
    
    user: Mapped["User"] = relationship("User", back_populates="match_links")
    match: Mapped["Match"] = relationship("Match", back_populates="users")
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "match_id": self.match_id,
            "is_player": self.is_player,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "deleted_at": self.deleted_at.isoformat() if self.deleted_at else None,
        }
