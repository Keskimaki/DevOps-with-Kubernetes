FROM node:18-alpine

EXPOSE 3000

WORKDIR usr/src/app

COPY package* ./

RUN npm ci

COPY . .

CMD ["npm", "start"]
