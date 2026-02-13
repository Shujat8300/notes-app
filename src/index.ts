import express from "express";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());

// API routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("IPTV Node.js + TS + Prisma 6 CRUD is working!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
