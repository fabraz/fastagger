# base image
FROM python:3.8.0-alpine

RUN apk update && \
    apk add --virtual build-deps gcc g++ python-dev musl-dev && \
	apk add jpeg-dev zlib-dev libjpeg && \
	apk add poppler-dev poppler-utils alpine-sdk  && \
    apk add netcat-openbsd

WORKDIR /app

# add and install requirements
RUN pip install --upgrade pip
COPY ./load/requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt
COPY ./load/load_pdfs.py /app/load_pdfs.py

# add app
COPY . /app

# run page image extractor script
CMD ["python", "/app/load_pdfs.py"]
