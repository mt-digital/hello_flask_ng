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

    UPLOADS_DEFAULT_DEST = 'dev-uploads'
    DEBUG = True


class TestingConfig(Config):

    UPLOADS_DEFAULT_DEST = 'test-uploads'
    MONGODB_SETTINGS = {'db': 'greetings_test'}

    TESTING = True


class ProductionConfig(Config):

    UPLOADS_DEFAULT_DEST = os.environ.get('HELLO_UPLOADS_DIR')


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
