FROM node:18

WORKDIR ./

RUN npm install
COPY . .
EXPOSE 8086

CMD ['node', 'app.js']