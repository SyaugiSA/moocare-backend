FROM node:latest
WORKDIR /app
COPY packege.json .
RUN npm install
copy . .