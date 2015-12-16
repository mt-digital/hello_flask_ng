"""
Unit tests for server functions contained in app/api/views.py

Author: Matthew A. Turner
Date: 2015-14-12
"""
import json
import unittest

from ..manage import app
from ..app.models import Greeting


class TestAPI(unittest.TestCase):
    """
    API for getting a greeting with your name in one of 8 languages
    """
    def setUp(self):

        self.client = app.test_client()

        try:
            Greeting.drop_collection()
        except:
            pass

    def tearDown(self):

        Greeting.drop_collection()

    def test_hello(self):
        """
        /api/hello writes all to database, includes name, and covers all languages
        """
        languages = ['English', 'Arabic', 'Hebrew', 'Spanish', 'French',
            'Turkish', 'Russian', 'Japanese']

        # as these are found in languages, remove them; should be empty at end
        unused_languages = list(languages)

        # (7/8)^(1e3) ~ 1e-58 chance of not all languages being used
        for i in range(int(1e3)):

            res = self.client.get('/api/hello/Northwest Knowledge Network')

            data = json.loads(res.data)

            # check name is present in response
            assert 'Northwest Knowledge Network' in data['greeting']

            lang = data['language']

            assert lang in languages

            if lang in unused_languages:
                unused_languages.remove(lang)

        assert len(Greeting.objects) == int(1e3)

        assert unused_languages == []

    def test_other_thing(self):
        """
        Other thing should work properly
        """
        assert False
