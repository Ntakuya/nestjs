FROM node:14

RUN apt-get update
RUN apt-get -y install locales-all

WORKDIR /api

COPY . .

CMD [ "npm", "install" ]