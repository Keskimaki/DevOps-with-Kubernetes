FROM node:18-alpine

EXPOSE $PORT

WORKDIR usr/src/app

COPY package* ./

RUN npm ci

COPY . .

CMD ["npm", "start"]
