FROM node:22

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm","run", "start"]