FROM node:16-alpine3.11

WORKDIR /app

COPY package*.json /app/

RUN npm install --quiet

COPY . .