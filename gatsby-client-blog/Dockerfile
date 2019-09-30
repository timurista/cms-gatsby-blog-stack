FROM node
RUN npm install --quiet -g node-gyp gatsby-cli gatsby

COPY . .

RUN yarn install && yarn cache clean
RUN yarn add sharp gatsby-transformer-yaml --build-from-source
VOLUME [ "/data" ]
RUN yarn build; yarn serve
EXPOSE 9000
ENTRYPOINT [ "/bin/bash" ]