FROM node:18-slim

ENV NODE_ENV development

WORKDIR /app

COPY . .

RUN npm install

CMD [ "yarn", "start" ]

EXPOSE 5000