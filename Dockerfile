FROM node:20-bookworm

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3333

CMD ["npm", "start"]
