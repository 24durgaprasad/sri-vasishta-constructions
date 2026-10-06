"use client";

import { useState } from "react";
import type { Project } from "@/data/types";
import type { QaItem } from "@/data/types";

type Props = {
  project: Project;
  items?: QaItem[];
};

type Status = "idle" | "sending" | "sent" | "error";

export function QaSection({ project, items }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const answered = items ?? [];

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError(null);

    try {
      const response = await fetch("/api/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project: project.id,
          question: data.get("question"),
          company: data.get("company") ?? "",
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
      setError("Could not reach the server. Please try again shortly.");
    }
  };

  return (
    <div>
      {answered.length > 0 ? (
        <div>
          <ul className="divide-y divide-navy-100 overflow-hidden rounded-card-lg border border-navy-100 bg-white">
            {answered.map((item) => (
              <li key={item.question} className="px-5 py-5">
                <p className="text-sm font-bold text-navy-900">
                  <span className="mr-2 inline-block rounded bg-navy-100 px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-navy-700">
                    For project
                  </span>
                  Q: {item.question}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-navy-700">
                  A: {item.answer}
                </p>
                <p className="mt-2 text-xs text-navy-500">
                  Answered {item.answeredAgo}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-navy-500">
            Disclaimer: please verify the answers above with the developer before
            making a decision. We do not take responsibility for discrepancies in
            the information provided.
          </p>
        </div>
      ) : (
        <p className="rounded-card-lg border border-dashed border-navy-200 bg-white px-5 py-6 text-sm text-navy-600">
          No questions answered yet for {project.name}. Ask the first one below
          and our team will get it answered.
        </p>
      )}

      <form
        className="mt-6 rounded-card-lg border border-navy-100 bg-white p-5 shadow-card sm:p-6"
        onSubmit={onSubmit}
      >
        <label
          htmlFor="qa-question"
          className="block text-sm font-bold text-navy-900"
        >
          Have any question? Ask here
        </label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            id="qa-question"
            name="question"
            required
            minLength={10}
            placeholder={`Ask about ${project.name}…`}
            className="w-full flex-1 rounded-xl border border-navy-200 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:border-brand-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Ask question"}
          </button>
        </div>

        <div className="mt-3">
          {/* Honeypot — hidden from real users */}
          <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="qa-company">Company</label>
            <input
              id="qa-company"
              name="company"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <p aria-live="polite" className="text-sm">
            {status === "sent" ? (
              <span className="font-medium text-emerald-700">
                Thanks — your question is with our team. Questions are answered
                and appear here once reviewed.
              </span>
            ) : null}
            {status === "error" ? (
              <span className="font-medium text-red-700">{error}</span>
            ) : null}
            {status === "idle" || status === "sending" ? (
              <span className="text-xs text-navy-500">
                Get answers to your unanswered questions.
              </span>
            ) : null}
          </p>
        </div>
      </form>
    </div>
  );
}
