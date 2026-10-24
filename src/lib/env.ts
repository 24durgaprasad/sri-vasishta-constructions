/**
 * Environment helpers.
 * Import individual values — never import the whole process.env in client code.
 */

export const MONGODB_URI = process.env.MONGODB_URI ?? "";
export const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret-please-change-in-production";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@vasishta.com";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "changeme123";
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME ?? "";
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY ?? "";
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET ?? "";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const isMongoConfigured = Boolean(MONGODB_URI);
export const isCloudinaryConfigured = Boolean(
  CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET
);
