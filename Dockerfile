# stage build #
FROM node:20 as build
WORKDIR /app
COPY . .
CMD npm i
CMD npm run build


# stage run #
FROM node:20 as production
WORKDIR /app

COPY package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/index.js ./dist
EXPOSE 8088

CMD ["npm", "run", "start"]