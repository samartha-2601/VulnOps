from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import ForeignKey
from sqlalchemy import DateTime
from sqlalchemy.orm import relationship

from datetime import datetime

from app.database import Base


class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True)

    report_id = Column(
        Integer,
        ForeignKey("reports.id")
    )

    vulnerability_type = Column(String)

    severity = Column(String)

    root_cause = Column(Text)

    remediation = Column(Text)

    report = relationship("Report")

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )