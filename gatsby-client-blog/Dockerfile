FROM node
RUN npm install --quiet -g node-gyp gatsby-cli gatsby

COPY . .
WORKDIR /usr/src/app
RUN yarn install && yarn cache clean
RUN yarn add sharp gatsby-transformer-yaml --build-from-source
VOLUME [ "/data" ]
RUN yarn build
EXPOSE 9000
ENTRYPOINT [ "gatsby", "serve" ]