FROM node:14-alpine

RUN mkdir -p /opt/cashcog

WORKDIR /opt/cashcog
COPY frontend ./src

WORKDIR /opt/cashcog/src
# fixes issue explained in https://github.com/yarnpkg/yarn/issues/6617
RUN npm config set scripts-prepend-node-path true
RUN yarn

CMD yarn start

EXPOSE 3000

