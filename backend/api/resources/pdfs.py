from flask import jsonify, Blueprint
import json
import os

pdfs_blueprint = Blueprint('_pdfs', __name__)
APP_ROOT = os.path.dirname(os.path.abspath(__file__))

@pdfs_blueprint.route('/pdfs', methods=['GET'])
def get_all_pdfs():
    """Get all pdf data from file"""
   
    f = open(f'{APP_ROOT}/../static/pdfs/pdfs.json', "r")
    data = json.load(f)

    response = jsonify(data)

    response.headers['Access-Control-Allow-Origin'] = '*'

    return response, 200
