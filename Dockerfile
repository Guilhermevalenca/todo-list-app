FROM node:20-alpine
LABEL authors="guilherme"

RUN npm i -g @quasar/cli

RUN npm i -g json-server

RUN npm i -g @vue/cli
