# syntax=docker/dockerfile:1
#LABEL domain="michaelolson.blog"
#LABEL author="michaelolson.1996@protonmail.com"

FROM node:16-alpine3.11
WORKDIR /app
COPY package.json .
RUN npm install --quiet
EXPOSE 3001
COPY . .