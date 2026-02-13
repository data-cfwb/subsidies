FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* ./

RUN yarn install

COPY . .

EXPOSE 8080

CMD ["yarn", "serve"]
