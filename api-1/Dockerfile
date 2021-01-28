  
FROM node:12.18.3-alpine

WORKDIR /api-1/
COPY package.json . 
RUN npm i
COPY . . 
RUN npm run build
EXPOSE 3000
CMD ["npm","start"]