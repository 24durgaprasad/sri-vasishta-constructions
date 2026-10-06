import Image from "next/image";

export function Logo({
  className = "",
  variant = "solid",
}: {
  className?: string;
  variant?: "solid" | "onHero";
}) {
  const onHero = variant === "onHero";

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src={onHero ? "/brand/logo-icon-reversed.png" : "/brand/logo-icon-color.png"}
        alt=""
        width={340}
        height={340}
        sizes="48px"
        className="h-10 w-10 shrink-0 sm:h-11 sm:w-11"
        priority
      />
      <span className="flex flex-col leading-none">
        <span
          className={`text-base font-bold tracking-tight sm:text-lg ${
            onHero ? "text-white" : "text-navy-900"
          }`}
        >
          Sri Vasishta
        </span>
        <span
          className={`mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] ${
            onHero ? "text-brand-300" : "text-brand-700"
          }`}
        >
          Constructions
        </span>
      </span>
    </span>
  );
}
