FROM node:lts-alpine
WORKDIR /dentalapp/src/app
COPY dentalapp-frontend/package*.json ./
RUN ls -l
RUN yarn install
COPY dentalapp-frontend ./
RUN ls -l
RUN yarn run build
COPY /dentalapp-frontend/nodeServer/nodeServer.js build/nodeServer.js
WORKDIR /dentalapp/src/app/build
EXPOSE 8080
CMD ["node", "nodeServer.js"]