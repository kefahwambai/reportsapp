FROM alpine:3.17

RUN apk --no-cache add nodejs npm

COPY . /ireporta
WORKDIR /ireporta 
RUN npm install

CMD ["npm", "start"]