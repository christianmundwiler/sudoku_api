from flask import Flask, request
from flask_cors import CORS, cross_origin
import requests
import os

from json import loads, dumps

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/solve', methods=["POST"])
def solve():
    request_data = loads(request.get_data())
    print(request_data)
    response = requests.post("https://solve-sudoku.p.rapidapi.com/",
        headers = {
            "X-RapidAPI-Host": "solve-sudoku.p.rapidapi.com",
            "X-RapidAPI-Key": os.getenv("RAPID_API_KEY"),
            "Content-Type": "application/json"
        },
        data = dumps(request_data)
    )
    response_result = loads(response.text)
    print(response_result)
    return response_result

if __name__ == '__main__':
    app.run(debug=True)