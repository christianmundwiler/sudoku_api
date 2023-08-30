from flask import Flask, request, render_template
from flask_cors import CORS
from json import loads
from dotenv import load_dotenv
import requests
import os

load_dotenv()

app = Flask(__name__, template_folder="templates/pages", static_folder="templates/static")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# render and run front end
@app.route("/")
def index():
    return render_template("index.html")

# flask endpoint to receive request from front end, forward to sudoku api, send back response
@app.route("/solve", methods=["POST"])
def solve():
    request_data = request.get_data()
    print(request_data)
    response = requests.post("https://solve-sudoku.p.rapidapi.com/",
        headers = {
            "X-RapidAPI-Host": "solve-sudoku.p.rapidapi.com",
            "X-RapidAPI-Key": os.getenv("RAPID_API_KEY"),
            "Content-Type": "application/json"
        },
        data = request_data
    )
    response_result = loads(response.text)
    print(response_result)
    return response_result

if __name__ == '__main__':
    app.run(host='0.0.0.0')