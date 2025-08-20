import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { faker } from "@faker-js/faker";

let db;

export async function initDB() {
  db = await open({
    filename: ":memory:",  // or "cosma.db" for file
    driver: sqlite3.Database,
  });

  // Create tables
  await db.exec(`
    CREATE TABLE concerns (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);
    CREATE TABLE treatments (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);
    CREATE TABLE concern_treatments (concern_id INTEGER, treatment_id INTEGER);
    CREATE TABLE packages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clinic_name TEXT,
      package_name TEXT,
      treatment_id INTEGER,
      price REAL
    );
    CREATE TABLE enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      package_id INTEGER,
      user_name TEXT,
      user_email TEXT,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // ---- Seed Fake Data ----
  const concernNames = ["Acne", "Hair Loss", "Dark Circles", "Wrinkles", "Pigmentation"];
  const treatmentNames = ["Laser Therapy", "Chemical Peel", "Hair Transplant", "Botox", "PRP Therapy"];

  // Insert concerns
  for (const c of concernNames) {
    await db.run("INSERT INTO concerns (name) VALUES (?)", [c]);
  }

  // Insert treatments
  for (const t of treatmentNames) {
    await db.run("INSERT INTO treatments (name) VALUES (?)", [t]);
  }

  // Map randomly concern → treatments
  for (let concern_id = 1; concern_id <= concernNames.length; concern_id++) {
    const randomTreatmentId = Math.ceil(Math.random() * treatmentNames.length);
    await db.run("INSERT INTO concern_treatments (concern_id, treatment_id) VALUES (?, ?)", [concern_id, randomTreatmentId]);
  }

  // Insert packages
  for (let i = 1; i <= 10; i++) {
    const treatment_id = Math.ceil(Math.random() * treatmentNames.length);
    await db.run(
      "INSERT INTO packages (clinic_name, package_name, treatment_id, price) VALUES (?,?,?,?)",
      [
        faker.company.name() + " Clinic",
        faker.commerce.productName(),
        treatment_id,
        faker.commerce.price({ min: 100, max: 1000 }),
      ]
    );
  }

  // Insert fake enquiries
  for (let i = 1; i <= 5; i++) {
    await db.run(
      "INSERT INTO enquiries (package_id, user_name, user_email, message) VALUES (?,?,?,?)",
      [
        Math.ceil(Math.random() * 10), // random package
        faker.person.firstName(),
        faker.internet.email(),
        faker.lorem.sentence(),
      ]
    );
  }

  console.log("✅ Fake data seeded");
}

export function getDB() {
  return db;
}
