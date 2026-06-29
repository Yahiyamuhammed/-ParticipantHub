from sqlalchemy import Column, Integer, String, LargeBinary, DateTime
from app.database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    district = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    embedding = Column(LargeBinary, nullable=False)  # STORE IN DATABASE, NOT FILE!
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "district": self.district,
            "email": self.email,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }