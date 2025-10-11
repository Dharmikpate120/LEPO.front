FROM node:22

COPY . .

RUN npm i

EXPOSE 3000

CMD ["npm","run", "start"]
