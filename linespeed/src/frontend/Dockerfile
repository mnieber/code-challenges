FROM node:14-alpine

RUN mkdir -p /app

WORKDIR /app
COPY frontend ./src

WORKDIR /app/src
# fixes issue explained in https://github.com/yarnpkg/yarn/issues/6617
RUN npm config set scripts-prepend-node-path true
RUN yarn

CMD yarn start

EXPOSE 3000

