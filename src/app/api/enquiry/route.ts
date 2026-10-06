import { NextResponse } from "next/server";
import { saveSubmission } from "@/lib/submissions";

const topics = ["enquiry", "contact", "rent", "career"] as const;
type Topic = (typeof topics)[number];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneDigits = (value: string) => value.replace(/\D/g, "");

const clean = (value: unknown, maxLength: number): string =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real users never fill this field.
  if (clean(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 80);
  const phone = clean(body.phone, 25);
  const email = clean(body.email, 120);
  const message = clean(body.message, 1000);
  const project = clean(body.project, 120);
  const configuration = clean(body.configuration, 40);
  const rawTopic = clean(body.topic, 30);
  const topic: Topic = (topics as readonly string[]).includes(rawTopic)
    ? (rawTopic as Topic)
    : "enquiry";

  const errors: string[] = [];
  if (name.length < 2) errors.push("Please enter your name.");
  if (phoneDigits(phone).length < 8 || phoneDigits(phone).length > 15) {
    errors.push("Please enter a valid phone number.");
  }
  if (email && !emailPattern.test(email)) errors.push("Please enter a valid email address.");
  if (message.length > 1000) errors.push("Message is too long.");
  if (topic === "career" && message.length < 10) {
    errors.push("Tell us a little about your experience.");
  }

  if (errors.length > 0) {
    return NextResponse.json({ ok: false, error: errors.join(" ") }, { status: 400 });
  }

  const stored = await saveSubmission("enquiries.jsonl", {
    topic,
    name,
    phone,
    email,
    project,
    configuration,
    message,
    referer: clean(body.referer, 300),
  });

  return NextResponse.json({ ok: true, stored });
}
