  
FROM node:12.18.3-alpine

WORKDIR /service-1/
COPY package.json . 
RUN npm i
COPY . . 
RUN npm run build
CMD ["npm","start"]