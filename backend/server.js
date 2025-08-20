import express from "express";
import { initDB } from "./db.js";
import searchRoutes from "./routes/search.js";
import enquiryRoutes from "./routes/enquiries.js";
import adminRoutes from "./routes/admin.js";
import cors from 'cors';

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin:process.env.FORNTEND_URL|| "http://localhost:5173",
    credentials: true, // if you need cookies/auth headers
  })
);
app.use("/search", searchRoutes);
app.use("/enquiries", enquiryRoutes);
app.use("/admin", adminRoutes);

// Init & start
initDB().then(() => {
  app.listen(process.env.PORT||3000, () =>
    console.log("🚀 Server running on http://localhost:3000")
  );
});
