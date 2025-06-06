FROM node:18-alpine as client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm config set registry https://registry.npmjs.org/ && npm install
COPY client/ .
RUN npm run build

FROM node:18-alpine as server-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm config set registry https://registry.npmjs.org/ && npm install
COPY server/ .

FROM node:18-alpine
WORKDIR /app

COPY --from=client-builder /app/client/dist ./client/dist

COPY --from=server-builder /app/server ./server

WORKDIR /app/server
RUN npm config set registry https://registry.npmjs.org/ && npm install --production

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "src/index.js"] 