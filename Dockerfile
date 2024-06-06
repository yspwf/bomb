FROM node:18

RUN mkdir /app

WORKDIR /app

RUN npm install
COPY . .
EXPOSE 8086

CMD ['node', 'app.js']