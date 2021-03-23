FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

RUN pip install --upgrade pip

COPY backend /app/src

WORKDIR /app/src
RUN pip3 install -r requirements.txt

CMD python3 producer/create_speed_events.py