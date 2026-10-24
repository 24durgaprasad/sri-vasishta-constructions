"use client";

import { useState, useTransition } from "react";
import { publishProjectAction } from "@/lib/actions/projects";

interface Props {
  id: string;
  published: boolean;
}

export function PublishToggle({ id, published: initialPublished }: Props) {
  const [published, setPublished] = useState(initialPublished);
  const [isPending, startTransition] = useTransition();

  function toggle() {
    startTransition(async () => {
      const res = await publishProjectAction(id, !published);
      if (res.ok) setPublished((p) => !p);
    });
  }

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      type="button"
      aria-label="Toggle published status"
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${
        published ? "bg-green-500" : "bg-navy-300"
      } ${isPending ? "opacity-50" : ""}`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
          published ? "translate-x-4.5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
