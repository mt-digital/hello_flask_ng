# *-* coding: utf-8 *-*
"""API"""
import random

from flask import jsonify
from flask_cors import cross_origin

from . import api
from ..models import Greeting


@api.route('/api/hello/<string:name>', methods=['GET'])
@cross_origin(origin='*', methods=['GET'],
              headers=['X-Requested-With', 'Content-Type', 'Origin'])
def hello(name):

    languages = ['English', 'Russian', 'Japanese', 'Arabic', 'French',
                 'Turkish', 'Spanish', 'Hebrew']

    greeting = ['Hello', u'Здравствуйте', u'こんにちは', u'أهلا', 'Salut',
                'Merhaba', 'Hola', u'שלום']

    language, greeting = random.choice(zip(languages, greeting))

    # construct the greeting; Hebrew and Arabic need special treatment
    if language == u'Hebrew':
        greeting = unicode(name) + u' , ' + greeting

    elif language == u'Arabic':
        greeting = unicode(name) + u' ،' + greeting

    else:
        greeting = greeting + u', ' + name

    # create a new Greeting Mongo document
    gr = Greeting()

    # fill it in
    gr.greeting = greeting
    gr.language = language
    gr.name = name

    # persist it
    gr.save()

    # respond to client with JSON greeting and language used
    return jsonify({'language': language,
                    'greeting': greeting})
