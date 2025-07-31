FROM node:22.17

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 8080

CMD ["node", "src/server.js"]
