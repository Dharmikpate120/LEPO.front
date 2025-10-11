FROM node:22

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline

COPY . .

RUN --mount=type=cache, target=/root/.next/cache \
    npm run build
EXPOSE 3000

CMD ["npm","run", "start"]
