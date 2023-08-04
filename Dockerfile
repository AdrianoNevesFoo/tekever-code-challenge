FROM node:16-slim

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY prisma ./prisma
# copy source code to /app/src folder
COPY src /app/src
COPY .env ./

# check files list
RUN ls -a

RUN npm i -g @nestjs/schematics
RUN npm install
RUN apt-get update && apt-get install -y openssl libssl-dev
RUN npx prisma generate --schema ./prisma/schema.prisma
RUN npm run build

EXPOSE 9000

CMD [ "node", "./dist/src/main.js" ]