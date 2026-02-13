# Use Node 18 LTS
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Generate Prisma client (v6)
RUN npx prisma generate

# Expose the port
EXPOSE 3000

# Start app (do NOT run prisma db push in CMD)
CMD ["npm", "start"]
