import { getDB } from "../db.js";

export async function searchConcern(req, res) {
  const { concern } = req.query;
  const db = getDB();

  if (!concern) return res.status(400).json({ error: "concern is required" });

  const c = await db.get("SELECT * FROM concerns WHERE name LIKE ?", `%${concern}%`);
  console.log(c)
  if (!c) return res.json({ concern: null, treatments: [], packages: [] });

  const treatments = await db.all(
    `SELECT t.* FROM treatments t 
     JOIN concern_treatments ct ON t.id = ct.treatment_id 
     WHERE ct.concern_id = ?`,
    [c.id]
  );

  const treatmentIds = treatments.map(t => t.id).join(",") || "0";
  const packages = await db.all(
    `SELECT * FROM packages WHERE treatment_id IN (${treatmentIds})`
  );

  return res.json({ concern: c, treatments, packages });
}
