FROM node:latest
WORKDIR /app

COPY package*.json .

RUN npm cache clean --force
RUN npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate

EXPOSE 3000
CMD ["npm", "run", "start:dev"]
