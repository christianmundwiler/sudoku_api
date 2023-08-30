from flask import Flask, request, render_template
from flask_cors import CORS
import requests
import os

from json import loads, dumps

app = Flask(__name__, template_folder="templates/pages", static_folder="templates/static")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/solve", methods=["POST"])
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
    app.run(host='0.0.0.0', debug=True)