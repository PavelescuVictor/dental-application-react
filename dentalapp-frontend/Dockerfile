FROM node:lts-alpine
WORKDIR /dentalapp-frontend/src/app
COPY /package*.json ./
RUN ls -l
RUN yarn install
COPY ./ ./
RUN ls -l
RUN yarn build
COPY ./nodeServer/nodeServer.js dist/nodeServer.js
WORKDIR /dentalapp-frontend/src/app/dist
EXPOSE 8080
CMD ["node", "nodeServer.js"]