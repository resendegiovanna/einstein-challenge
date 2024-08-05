FROM node:18

RUN apt-get update && apt-get install -y default-mysql-client

WORKDIR /app

COPY . .

RUN yarn install --quiet --no-optional --no-fund --loglevel=error

EXPOSE 3000

CMD ["npm", "run", "dev"]