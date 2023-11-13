FROM node:20-alpine3.17

RUN apk add curl

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]