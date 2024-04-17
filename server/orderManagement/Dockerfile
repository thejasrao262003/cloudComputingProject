FROM node:16-alpine

WORKDIR /orderManagement

COPY package*.json ./

RUN npm install

EXPOSE 5003

COPY order.js ./

CMD [ "npm", "run", "dev"]