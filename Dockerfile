FROM node:20-alpine3.17

WORKDIR /app

COPY . .

RUN npm install
RUN npx prisma migrate dev

EXPOSE 3000

CMD [ "npm", "run", "dev" ]