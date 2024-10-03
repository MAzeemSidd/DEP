# Using a lightweight Node.js image
FROM node:18-alpine

# Copy only package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your project code
COPY . .

# Expose the port your server listens on.
EXPOSE 3550

# Starting the server using npm start (also, yarn start)
CMD [ "node", "order_service.js" ]