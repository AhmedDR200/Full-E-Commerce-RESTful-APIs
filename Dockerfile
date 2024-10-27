# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy only the entry point file to the root of the container
COPY server.js . 

# Copy the src directory
COPY src ./src

# Copy the .env file
COPY .env ./

# Expose the app's port
EXPOSE 3000

# Set environment variables for production
ENV NODE_ENV=Development
ENV PORT=3000

# Run the application
CMD ["node", "server.js"]
