import { getDB } from "../db.js";

export async function listEnquiries(req, res) {
  const db = getDB();
  const enquiries = await db.all(`
    SELECT e.*, p.package_name, p.clinic_name
    FROM enquiries e
    JOIN packages p ON e.package_id = p.id
    ORDER BY e.created_at DESC
  `);

  res.json(enquiries);
}
