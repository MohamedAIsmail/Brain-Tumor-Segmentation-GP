from sqlalchemy import Column, Integer, String, ForeignKey
from app.config import Base


class Report(Base):
    __tablename__ = "reports"

    id = Column(
        Integer, primary_key=True, index=True, nullable=False, autoincrement=True
    )
    studyId = Column(String, unique=True, nullable=False)
    content = Column(String, nullable=True)
