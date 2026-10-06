"use client";

import { useState } from "react";
import type { Project } from "@/data/types";

type Status = "idle" | "sending" | "sent" | "error";

export function EnquiryForm({ project }: { project: Project }) {
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
          topic: "enquiry",
          project: project.name,
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email") ?? "",
          configuration: data.get("configuration") ?? "",
          message: `Enquiry about ${project.name}, ${project.locality}`,
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
      setError("Could not reach the server. Please call our sales team instead.");
    }
  };

  return (
    <div className="rounded-card-lg border border-navy-100 bg-navy-900 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-white">Ask for details</h2>
      <p className="mt-1.5 text-sm text-navy-300">
        Our sales team will get back to you with current availability and pricing
        for {project.name}.
      </p>

      <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
        <div>
          <label htmlFor="enq-name" className="block text-xs font-semibold uppercase tracking-wider text-navy-300">
            Full name
          </label>
          <input
            id="enq-name"
            name="name"
            required
            autoComplete="name"
            className="mt-1.5 w-full rounded-xl border border-navy-700 bg-navy-950 px-3.5 py-2.5 text-sm text-white placeholder:text-navy-400 focus:border-brand-500 focus:outline-none"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="enq-phone" className="block text-xs font-semibold uppercase tracking-wider text-navy-300">
            Phone
          </label>
          <input
            id="enq-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            className="mt-1.5 w-full rounded-xl border border-navy-700 bg-navy-950 px-3.5 py-2.5 text-sm text-white placeholder:text-navy-400 focus:border-brand-500 focus:outline-none"
            placeholder="+91"
          />
        </div>
        <div>
          <label htmlFor="enq-email" className="block text-xs font-semibold uppercase tracking-wider text-navy-300">
            Email
          </label>
          <input
            id="enq-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1.5 w-full rounded-xl border border-navy-700 bg-navy-950 px-3.5 py-2.5 text-sm text-white placeholder:text-navy-400 focus:border-brand-500 focus:outline-none"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="enq-interest" className="block text-xs font-semibold uppercase tracking-wider text-navy-300">
            Configuration
          </label>
          <select
            id="enq-interest"
            name="configuration"
            defaultValue={project.bhks[0]}
            className="mt-1.5 w-full rounded-xl border border-navy-700 bg-navy-950 px-3.5 py-2.5 text-sm text-white focus:border-brand-500 focus:outline-none"
          >
            {project.bhks.map((bhk) => (
              <option key={bhk} value={bhk}>
                {bhk}
              </option>
            ))}
          </select>
        </div>

        {/* Honeypot — hidden from real users */}
        <div
          className="absolute -left-[9999px] h-px w-px overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor="enq-company">Company</label>
          <input
            id="enq-company"
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
            {status === "sending" ? "Sending…" : "Send enquiry"}
          </button>
        </div>

        <div aria-live="polite" className="sm:col-span-2">
          {status === "sent" ? (
            <p className="rounded-xl bg-emerald-400/15 px-4 py-3 text-sm font-medium text-emerald-200">
              Thanks — your enquiry is with our team. We will call you with
              current availability and pricing.
            </p>
          ) : null}
          {status === "error" ? (
            <p className="rounded-xl bg-red-400/15 px-4 py-3 text-sm font-medium text-red-200">
              {error}
            </p>
          ) : null}
          {status === "idle" || status === "sending" ? (
            <p className="text-xs text-navy-400">
              We use your number only to reply about {project.name}.
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}