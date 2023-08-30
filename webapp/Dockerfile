FROM python:3.9

COPY /webapp /webapp

WORKDIR /webapp

RUN pip install -r requirements.txt

CMD export FLASK_APP=backend.py;flask run --host=0.0.0.0