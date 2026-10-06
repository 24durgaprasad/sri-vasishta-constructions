"use client";

import { useId, useState } from "react";
import type { FloorPlan } from "@/data/types";
import { formatArea, formatDimension, priceFromLabel } from "@/lib/format";

const ISO_X = 0.82;
const ISO_Y = 0.5;
const WALL_HEIGHT = 14;
const GAP = 3;

type Props = {
  floorPlans: FloorPlan[];
};

function layoutRows(rooms: FloorPlan["rooms"]) {
  const total = rooms.reduce((sum, room) => sum + room.width, 0) + GAP * (rooms.length - 1);
  const rows: { room: (typeof rooms)[number]; x: number; y: number }[] = [];
  let x = 0;
  rooms.forEach((room) => {
    rows.push({ room, x, y: 0 });
    x += room.width + GAP;
  });
  return { rows, total };
}

function planPath(x: number, y: number, w: number, h: number) {
  return `M ${x} ${y} l ${w * ISO_X} ${w * ISO_Y} l ${-h * ISO_X} ${h * ISO_Y} l ${-w * ISO_X} ${-w * ISO_Y} Z`;
}

function topFace(x: number, y: number, w: number, h: number) {
  return `M ${x * ISO_X} ${x * ISO_Y} l ${w * ISO_X} ${w * ISO_Y} l ${-h * ISO_X} ${h * ISO_Y} l ${-w * ISO_X} ${-w * ISO_Y} Z`;
}

export function FloorPlanExplorer({ floorPlans }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [helpfulVote, setHelpfulVote] = useState<"yes" | "no" | null>(null);
  const planId = useId();

  if (floorPlans.length === 0) return null;

  const plan = floorPlans[Math.min(activeIndex, floorPlans.length - 1)];
  const { rows, total } = layoutRows(plan.rooms);
  const maxHeight = Math.max(...plan.rooms.map((room) => room.height), 1);
  const viewBoxWidth = total * ISO_X + WALL_HEIGHT * ISO_X + 8;
  const viewBoxHeight = maxHeight * ISO_Y + WALL_HEIGHT + 8;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-start">
      <div className="rounded-card-lg border border-navy-100 bg-navy-50 p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">
              {plan.label}
            </p>
            <p className="mt-1 text-lg font-bold text-navy-900">
              {formatArea(plan.areaSqft)}
            </p>
          </div>
          <p className="rounded-full bg-white px-3 py-1 text-sm font-bold text-brand-700 ring-1 ring-brand-200">
            {priceFromLabel(plan.price)} onwards
          </p>
        </div>

        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          role="img"
          aria-labelledby={`${planId}-title ${planId}-desc`}
          className="h-auto w-full"
        >
          <title id={`${planId}-title`}>
            {`Indicative isometric floor plan for the ${plan.label} configuration`}
          </title>
          <desc id={`${planId}-desc`}>
            {`An isometric schematic showing ${plan.rooms.length} spaces: ${plan.rooms.map((room) => room.label).join(", ")}. Room dimensions are indicative and not the architect's layout.`}
          </desc>

          <g>
            {rows.map((row, index) => {
              const { room, x } = row;
              const shade = index % 2 === 0 ? "#ffffff" : "#f1f5fb";
              return (
                <g key={room.label}>
                  <path d={topFace(x, 0, room.width, room.height)} fill={shade} stroke="#c9d4e6" strokeWidth="0.4" />
                  <path
                    d={planPath(x, room.height, room.width, 0)}
                    fill="#dbe4f2"
                    stroke="#c9d4e6"
                    strokeWidth="0.4"
                  />
                  <path
                    d={`M ${x * ISO_X} ${x * ISO_Y} l 0 ${WALL_HEIGHT} l ${-room.height * ISO_X} ${room.height * ISO_Y} l 0 ${-WALL_HEIGHT} Z`}
                    fill="#b8c7de"
                    stroke="#9db1cd"
                    strokeWidth="0.4"
                  />
                </g>
              );
            })}
          </g>
        </svg>

        <p className="mt-4 text-xs leading-relaxed text-navy-500">
          Indicative schematic based on configuration and typical room proportions.
          Not the architect&apos;s drawing, and not to scale.
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold text-navy-700">
          Spaces in this plan
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {plan.rooms.map((room) => (
            <li
              key={room.label}
              className="flex items-baseline justify-between gap-3 rounded-xl border border-navy-100 bg-white px-3.5 py-2.5"
            >
              <span className="text-sm text-navy-800">{room.label}</span>
              <span className="shrink-0 text-xs text-navy-500">
                {formatDimension(room.width)} &times; {formatDimension(room.height)}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm font-semibold text-navy-700">
          Sizes and configurations
        </p>
        <div
          role="tablist"
          aria-label="Floor plan size and configuration"
          className="mt-3 flex flex-wrap gap-2"
        >
          {floorPlans.map((item, index) => (
            <button
              key={`${item.label}-${item.areaSqft}-${index}`}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={`rounded-xl border px-4 py-2 text-left transition ${
                index === activeIndex
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-navy-200 bg-white text-navy-700 hover:border-navy-300 hover:bg-navy-50"
              }`}
            >
              <span className="block text-sm font-semibold">{item.label}</span>
              <span
                className={`block text-xs ${index === activeIndex ? "text-navy-300" : "text-navy-500"}`}
              >
                {formatArea(item.areaSqft)}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-navy-100 bg-white px-4 py-3">
          <p className="text-sm text-navy-600">
            Is the pricing &amp; floor plan helpful?
          </p>
          <div className="flex items-center gap-2" role="group" aria-label="Rate this floor plan">
            <button
              type="button"
              aria-pressed={helpfulVote === "yes"}
              aria-label="Yes, helpful"
              onClick={() => setHelpfulVote("yes")}
              className={`grid size-9 place-items-center rounded-full border transition ${
                helpfulVote === "yes"
                  ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                  : "border-navy-200 text-navy-500 hover:border-navy-300 hover:text-navy-700"
              }`}
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
                <path
                  d="M7 10.5V17H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h3Zm0 0 3-7c1 0 1.8.8 1.6 1.8L11 8h4.5a1.5 1.5 0 0 1 1.5 1.8l-1.2 5.4a1.5 1.5 0 0 1-1.4 1.1H7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-pressed={helpfulVote === "no"}
              aria-label="No, not helpful"
              onClick={() => setHelpfulVote("no")}
              className={`grid size-9 place-items-center rounded-full border transition ${
                helpfulVote === "no"
                  ? "border-red-700 bg-red-50 text-red-700"
                  : "border-navy-200 text-navy-500 hover:border-navy-300 hover:text-navy-700"
              }`}
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
                <path
                  d="M13 9.5V3h3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-3Zm0 0-3 7c-1 0-1.8-.8-1.6-1.8L9 12H4.5A1.5 1.5 0 0 1 3 10.2l1.2-5.4A1.5 1.5 0 0 1 5.6 3.7H13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <p aria-live="polite" className="w-full text-xs text-navy-500 sm:w-auto">
            {helpfulVote ? "Thanks for your feedback." : ""}
          </p>
        </div>
      </div>
    </div>
  );
}