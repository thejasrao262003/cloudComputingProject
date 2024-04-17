FROM node:16-alpine

WORKDIR /userManagement

COPY package*.json ./

RUN npm install

EXPOSE 5001

COPY user.js ./

CMD [ "npm", "run", "dev"]