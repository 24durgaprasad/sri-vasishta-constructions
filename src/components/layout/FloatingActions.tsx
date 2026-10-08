import { site } from "@/data/site";

export function FloatingActions() {
  return (
    <div
      aria-label="Quick contact actions"
      className="fixed bottom-24 right-4 z-50 flex flex-col gap-3 lg:bottom-6 lg:right-5"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        className="grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#1eb85a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path d="M12 4a8 8 0 0 0-6.9 12l-1 3.5 3.6-1A8 8 0 1 0 12 4Zm4.5 11.3c-.2.6-1.2 1.1-1.7 1.1-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-4-4.5-4.1-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9 1-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.3.4-.3.3c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1.9 1.9 1.2 2.2 1.4.3.1.4.1.6-.1l.8-1c.2-.2.3-.2.6-.1l2.1 1c.3.2.5.2.6.4.1.1.1.6-.2 1.2Z" />
        </svg>
      </a>
      <a
        href={site.phoneHref}
        aria-label={`Call ${site.phone}`}
        title={`Call ${site.phone}`}
        className="grid size-12 place-items-center rounded-full bg-navy-900 text-white shadow-lg transition hover:scale-105 hover:bg-navy-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-5">
          <path
            d="M4 4h3l1.5 4-2 1.5a9 9 0 0 0 4 4l1.5-2 4 1.5v3a1 1 0 0 1-1.1 1A12 12 0 0 1 3 5.1 1 1 0 0 1 4 4Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
