FROM node:current-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]

# FROM node
#  WORKDIR /jenkins github
#  COPY package.json /jenkins github/
#  RUN npm cache clean --force
# RUN npm install
#  COPY . /jenkins github/
#  EXPOSE 8081
#  CMD ["npm","start"]
