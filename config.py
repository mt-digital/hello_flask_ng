"""
Configuration for Flask Application 'NKN Metadata Editor'
"""

import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:

    MONGODB_SETTINGS = {'db': 'greetings'}

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):

    MONGODB_SETTINGS = {'db': 'greetings_test'}

    TESTING = True


class ProductionConfig(Config):
    pass


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}

