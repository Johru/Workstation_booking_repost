FROM node:16-alpine3.16
WORKDIR /app 
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
          then npm install -g nodemon; \
          fi
COPY package.json .
RUN npm install
COPY . .
ENV PORT 3022
EXPOSE $PORT
CMD ["npm", "run", "dev"]