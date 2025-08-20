import { getDB } from "../db.js";

export async function createEnquiry(req, res) {
  const { package_id, user_name, user_email, message } = req.body;
  if (!package_id || !user_name || !user_email) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const db = getDB();
  const result = await db.run(
    `INSERT INTO enquiries (package_id, user_name, user_email, message) VALUES (?,?,?,?)`,
    [package_id, user_name, user_email, message || ""]
  );

  res.json({ success: true, enquiry_id: result.lastID });
}
