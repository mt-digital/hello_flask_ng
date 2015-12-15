from datetime import datetime

from . import db


class Greeting(db.Document):
    """MongoDB Document representation of greetings requested"""

    greeting = db.StringField(required=True)

    language = db.StringField(required=True)

    name = db.StringField(required=True)

    time_received = db.DateTimeField(default=datetime.now)


    meta = {'allow_inheritance': True}

    def __str__(self):

        return \
            '\n'.join(["{}: {}".format(k, self[k])
                       for k in self._fields_ordered])

