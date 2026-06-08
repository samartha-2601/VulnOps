from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    OPENAI_API_KEY: str
    APP_NAME: str = "VulnOps"
    APP_VERSION: str = "0.1.0"

    class Config:
        env_file = ".env"


settings = Settings()