FROM node
COPY . .
VOLUME [ "/data" ]
EXPOSE 8000
ENTRYPOINT [ "npm run build; npm run build" ]