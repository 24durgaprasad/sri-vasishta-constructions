import type { NavGroup } from "@/data/types";
import { navIconPath } from "@/data/nav";

type NavDropdownProps = {
  group: NavGroup;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onItemClick: () => void;
  onHero: boolean;
};

export function NavDropdown({
  group,
  isOpen,
  onOpen,
  onClose,
  onItemClick,
  onHero,
}: NavDropdownProps) {
  const labelId = `nav-${group.id}-label`;
  const panelId = `nav-${group.id}-panel`;

  const triggerClass = onHero
    ? isOpen
      ? "bg-white/15 text-white"
      : "text-white/85 hover:bg-white/10 hover:text-white"
    : isOpen
      ? "bg-navy-50 text-navy-900"
      : "text-navy-700 hover:bg-navy-50 hover:text-navy-900";

  return (
    <div
      className="relative"
      onPointerEnter={onOpen}
      onPointerLeave={onClose}
    >
      <button
        type="button"
        id={labelId}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => (isOpen ? onClose() : onOpen())}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "Enter") {
            event.preventDefault();
            onOpen();
          }
          if (event.key === "Escape") {
            onClose();
          }
        }}
        className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${triggerClass}`}
      >
        {group.label}
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className={`size-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path
            d="m5 7.5 5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen ? (
        <div
          id={panelId}
          role="menu"
          aria-labelledby={labelId}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              onClose();
            }
          }}
          className="absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-3"
        >
          <div className="animate-in overflow-hidden rounded-2xl border border-navy-100 bg-white p-2 shadow-card-hover">
            <div className="px-3 pb-2 pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                {group.label}
              </p>
            </div>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    role="menuitem"
                    onClick={onItemClick}
                    className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition hover:bg-navy-50"
                  >
                    <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-navy-900 text-white transition group-hover:bg-brand-500 group-hover:text-navy-950">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="size-4.5"
                      >
                        <path
                          d={navIconPath(item.icon)}
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-navy-900">
                        {item.label}
                      </span>
                      {item.description ? (
                        <span className="block text-xs text-navy-500">
                          {item.description}
                        </span>
                      ) : null}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}