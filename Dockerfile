FROM node:16-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 


COPY . .

RUN npm run build
FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/teamdoc-25126-firebase-adminsdk-dhvte-bf5f6c4c26.json ./teamdoc-25126-firebase-adminsdk-dhvte-bf5f6c4c26.json


EXPOSE 3000

CMD ["node", "dist/main"]
