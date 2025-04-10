# Use the official lightweight Node.js image
FROM node:20-slim

# Create and set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the app code
COPY . .

# Use port 8080 (Cloud Run expects this)
ENV PORT=8080

# Start the app
CMD ["npm", "start"]