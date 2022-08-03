from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

#init app
app = Flask(__name__)
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))

#Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#init_db
db = SQLAlchemy(app)
ma = Marshmallow(app)

#product class

class Url(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    original_url = db.Column(db.String(1000))
    shortened_url = db.Column(db.String(1000), unique=True)


    def __init__(self, original_url, shortened_url):
        self.original_url = original_url
        self.shortened_url = shortened_url


#product schema

class UrlSchema(ma.Schema):
    class Meta:
        fields = ('id', 'original_url', 'shortened_url')

#init schema

url_schema = UrlSchema()
urls_schema = UrlSchema(many=True)

@app.route('/', methods=['POST'])
def add_product():
    if request.method == 'POST':
        original_url = request.json['original_url']
        shortened_url = request.json['shortened_url']

        new_url = Url(original_url, shortened_url)

        db.session.add(new_url)
        db.session.commit()
    else:
        return 'Method not allowed'
    return url_schema.jsonify(new_url)

#get all urls

@app.route('/', methods=['GET'])
def get_urls():
    all_urls = Url.query.all()
    result = urls_schema.dump(all_urls)
    return jsonify(result)

#Run Server
if __name__ == '__main__':
    app.run(debug=True)
    