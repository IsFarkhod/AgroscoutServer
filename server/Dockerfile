FROM nodejs:latest

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

ENV FASTIFY_ADDRESS 0.0.0.0

CMD [ "npm", "start" ]