#!/usr/bin/env tsx
/**
 * Seed script: run with `npm run seed`
 * Seeds admin user, projects, and partners into MongoDB.
 * Safe to run multiple times (idempotent for slug/email).
 */

import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI ?? "";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@vasishta.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "changeme123";

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set. Exiting.");
  process.exit(1);
}

// Dynamic imports after env check
async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected.");

  // Import models after connection
  const { AdminModel } = await import("../src/lib/models/admin.model.js");
  const { ProjectModel } = await import("../src/lib/models/project.model.js");
  const { PartnerModel } = await import("../src/lib/models/partner.model.js");
  const { projects: staticProjects } = await import("../src/data/projects.js");
  const { getProjectWithDetail } = await import("../src/data/projectDetails.js");
  const { banks, interiorPartners } = await import("../src/data/partners.js");

  // 1. Admin
  const existingAdmin = await AdminModel.findOne({ email: ADMIN_EMAIL });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await AdminModel.create({ name: "Admin", email: ADMIN_EMAIL, passwordHash, role: "owner", active: true });
    console.log(`Created admin: ${ADMIN_EMAIL}`);
  } else {
    console.log(`Admin already exists: ${ADMIN_EMAIL}`);
  }

  // 2. Projects
  for (const p of staticProjects) {
    const existing = await ProjectModel.findOne({ slug: p.id });
    if (existing) {
      console.log(`Project exists: ${p.id}`);
      continue;
    }
    const { detail } = getProjectWithDetail(p);
    await ProjectModel.create({
      slug: p.id,
      name: p.name,
      developer: detail?.developer ?? "Sri Vasishta Constructions",
      propertyType: p.id === "vc-12" || p.id === "vc-16" ? "plots" : "flats",
      status: p.id === "vc-10" ? "completed" : "under-construction",
      collections: [p.collection],
      badge: p.badge,
      locality: p.locality,
      city: p.city,
      description: detail?.about ?? "",
      highlights: detail?.highlights ?? [],
      configurations: detail?.configurations ?? [],
      amenities: detail?.amenities ?? [],
      specifications: detail?.specifications ?? [],
      faqs: detail?.faq ?? [],
      nearby: detail?.nearby ?? [],
      priceMin: p.priceMin,
      priceMax: p.priceMax,
      pricePerSqft: detail?.pricePerSqft,
      carpetMin: detail?.carpetMin,
      carpetMax: detail?.carpetMax,
      landAreaAcres: detail?.landAreaAcres,
      towers: detail?.towers,
      totalUnits: detail?.totalUnits,
      launchDate: detail?.launchDate,
      possessionDate: detail?.possessionDate,
      reraId: detail?.reraId,
      brochureUrl: detail?.brochureUrl,
      brochurePreview: detail?.brochurePreview,
      images: p.images,
      published: true,
      localityPricePerSqft: detail?.localityPricePerSqft,
      localityPriceTrend: detail?.localityPriceTrend,
    });
    console.log(`Seeded project: ${p.id} — ${p.name}`);
  }

  // 3. Partners
  for (const b of banks) {
    const existing = await PartnerModel.findOne({ name: b.name, category: "bank" });
    if (!existing) {
      await PartnerModel.create({ name: b.name, category: "bank", logo: b.logo, logoSrc: b.logoSrc, featured: false, order: 0 });
      console.log(`Seeded bank: ${b.name}`);
    }
  }
  for (const ip of interiorPartners) {
    const existing = await PartnerModel.findOne({ name: ip.name, category: "interiors" });
    if (!existing) {
      await PartnerModel.create({ name: ip.name, category: "interiors", logo: ip.logo, logoSrc: ip.logoSrc, featured: false, order: 0 });
      console.log(`Seeded interior partner: ${ip.name}`);
    }
  }

  console.log("Seeding complete.");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
