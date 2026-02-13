import express, { Express } from 'express';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const app: Express = express();
const prisma = new PrismaClient();

// Middleware example
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Hello World 🌍');
});

// Connect to database and start server
async function main() {
  try {
    await prisma.$connect();
    console.log("Database connected ✅");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
}

main();
