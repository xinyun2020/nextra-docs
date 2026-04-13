FROM node:18

WORKDIR /app

ADD package.json pnpm-lock.json 

RUN npm i

COPY . .

EXPOSE 3000

CMD [ "pnpm", "run", "dev" ]