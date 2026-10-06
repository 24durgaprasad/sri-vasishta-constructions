"use client";

import { useState } from "react";

type Props = {
  topic?: "contact" | "rent" | "career";
  title?: string;
  description?: string;
  submitLabel?: string;
  includeMessage?: boolean;
  messageLabel?: string;
  messagePlaceholder?: string;
  messageRequired?: boolean;
};

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({
  topic = "contact",
  title = "Send us a message",
  description = "Our team replies within one working day, on the number or email you share.",
  submitLabel = "Send message",
  includeMessage = true,
  messageLabel = "Message",
  messagePlaceholder = "What are you looking for?",
  messageRequired = true,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError(null);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email") ?? "",
          message: data.get("message") ?? "",
          company: data.get("company") ?? "",
          referer: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      const result: { ok?: boolean; error?: string } = await response.json();

      if (!response.ok || !result.ok) {
        setStatus("error");
        setError(result.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("Could not reach the server. Please call us instead.");
    }
  };


  return (
    <div className="rounded-card-lg border border-navy-100 bg-white p-6 shadow-card sm:p-8">
      <h2 className="text-xl font-bold text-navy-900">{title}</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-navy-600">{description}</p>

      <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
        <div>
          <label
            htmlFor={`${topic}-name`}
            className="block text-xs font-semibold uppercase tracking-wider text-navy-500"
          >
            Full name
          </label>
          <input
            id={`${topic}-name`}
            name="name"
            required
            minLength={2}
            autoComplete="name"
            className="mt-1.5 w-full rounded-xl border border-navy-200 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:border-brand-500 focus:outline-none"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor={`${topic}-phone`}
            className="block text-xs font-semibold uppercase tracking-wider text-navy-500"
          >
            Phone
          </label>
          <input
            id={`${topic}-phone`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            className="mt-1.5 w-full rounded-xl border border-navy-200 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:border-brand-500 focus:outline-none"
            placeholder="+91"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor={`${topic}-email`}
            className="block text-xs font-semibold uppercase tracking-wider text-navy-500"
          >
            Email <span className="normal-case text-navy-400">(optional)</span>
          </label>
          <input
            id={`${topic}-email`}
            name="email"
            type="email"
            autoComplete="email"
            className="mt-1.5 w-full rounded-xl border border-navy-200 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:border-brand-500 focus:outline-none"
            placeholder="you@example.com"
          />
        </div>

        {includeMessage ? (
          <div className="sm:col-span-2">
            <label
              htmlFor={`${topic}-message`}
              className="block text-xs font-semibold uppercase tracking-wider text-navy-500"
            >
              {messageLabel}
            </label>
            <textarea
              id={`${topic}-message`}
              name="message"
              rows={4}
              required={messageRequired}
              minLength={messageRequired ? 10 : undefined}
              maxLength={1000}
              placeholder={messagePlaceholder}
              className="mt-1.5 w-full rounded-xl border border-navy-200 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:border-brand-500 focus:outline-none"
            />
          </div>
        ) : null}

        {/* Honeypot — hidden from real users */}
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor={`${topic}-company`}>Company</label>
          <input
            id={`${topic}-company`}
            name="company"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : submitLabel}
          </button>
        </div>

        <div aria-live="polite" className="sm:col-span-2">
          {status === "sent" ? (
            <p className="rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-700">
              Thanks — your message is with our team. We reply within one
              working day.
            </p>
          ) : null}
          {status === "error" ? (
            <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </p>
          ) : null}
          {status === "idle" || status === "sending" ? (
            <p className="text-xs text-navy-500">
              We use your number only to reply about property enquiries.
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
