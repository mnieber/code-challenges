FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

RUN pip install --upgrade pip && pip install pip-tools

RUN mkdir /opt/cashcog
COPY backend /opt/cashcog/src

WORKDIR /opt/cashcog/src
RUN pip3 install -r requirements.txt

# CMD is supplied by the fastapi docker image
