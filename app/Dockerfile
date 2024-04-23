# syntax=docker/dockerfile:1
FROM node:lts-alpine

ARG PORT=3000
ENV PORT ${PORT}

ENV YARN_CACHE_FOLDER=/cache/yarn
WORKDIR /home/node/app

# Install packages # yarn.lock
COPY package*.json ./
RUN --mount=type=cache,target=/cache/yarn \
  yarn install

COPY . .

EXPOSE ${PORT}

CMD ["yarn", "start"]