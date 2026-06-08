from pydantic import BaseModel


class ReportCreate(BaseModel):
    title: str
    description: str
    steps: str
    impact: str
    asset: str


class ReportResponse(BaseModel):
    id: int
    title: str

    class Config:
        from_attributes = True