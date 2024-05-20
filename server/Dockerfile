# Stage 1: Development
FROM node:20.13.1-alpine AS development

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the development port
EXPOSE 5000

# Command to run the application in development mode
CMD ["npm", "run", "start"]

# Stage 2: Production
FROM node:20.13.1-alpine AS production

# Set the working directory
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json files
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 5000

# Command to run the application
CMD ["node", "server.js"]