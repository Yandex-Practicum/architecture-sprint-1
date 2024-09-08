FROM node:18-slim

ENV NODE_ENV development

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i

COPY . .

CMD [ "npm", "start" ]