import os


class BaseConfig:
    """Base configuration"""
    TESTING = False

class DevelopmentConfig(BaseConfig):
    """Development configuration"""

class TestingConfig(BaseConfig):
    """Testing configuration"""
    TESTING = False

class ProductionConfig(BaseConfig):
    """Production configuration"""
    DEBUG = False


