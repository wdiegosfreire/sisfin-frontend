FROM node:12.18.3
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8180
CMD [ "npm", "run", "serve" ]