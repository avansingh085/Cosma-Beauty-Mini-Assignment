import express from "express";
import { initDB } from "./db.js";
import searchRoutes from "./routes/search.js";
import enquiryRoutes from "./routes/enquiries.js";
import adminRoutes from "./routes/admin.js";
import cors from 'cors';
const app = express();
app.use(express.json());

// Routes
app.use(cors('*'));
app.use("/search", searchRoutes);
app.use("/enquiries", enquiryRoutes);
app.use("/admin", adminRoutes);

// Init & start
initDB().then(() => {
  app.listen(3000, () =>
    console.log("🚀 Server running on http://localhost:3000")
  );
});
