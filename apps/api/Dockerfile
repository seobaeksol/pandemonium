FROM node:20-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/

RUN pnpm install

COPY . .

WORKDIR /usr/src/app/apps/api

EXPOSE 3001

CMD ["pnpm", "start:dev"]
