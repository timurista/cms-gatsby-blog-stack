FROM node
COPY . .
VOLUME [ "/data" ]
EXPOSE 8000
RUN npm run build; npm run build
ENTRYPOINT [ "/bin/bash" ]