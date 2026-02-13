FROM node:18

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Generate Prisma client
RUN npx prisma generate

# Expose the port
EXPOSE 3000

# Start app and push DB
CMD ["sh", "-c", "npx prisma db push && npm start"]
