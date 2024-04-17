FROM node:16-alpine

WORKDIR /productManagement

COPY package*.json ./

RUN npm install

EXPOSE 5002

COPY product.js ./

CMD [ "npm", "run", "dev"]