FROM node:22.17

WORKDIR /usr/app

# Install the application dependencies
COPY package.json ./ 
RUN npm install 

# Copy in the source code
COPY server.js ./
EXPOSE 8080

# Setup an app user so the container doesn't run as the root user

CMD ["npm", "run", "dev"]
