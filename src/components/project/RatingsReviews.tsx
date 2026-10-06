import type { ProjectRatings, ProjectReview } from "@/data/types";

type Props = {
  projectName: string;
  locality: string;
  ratings?: ProjectRatings;
  reviews?: ProjectReview[];
};

function ScoreRing({ score, label }: { score: number; label: string }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const filled = (Math.max(0, Math.min(5, score)) / 5) * circumference;

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="relative size-20">
        <svg viewBox="0 0 64 64" role="img" aria-label={`${label}: ${score} out of 5`} className="size-20 -rotate-90">
          <circle cx="32" cy="32" r={radius} fill="none" strokeWidth="6" className="stroke-navy-100" />
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${filled} ${circumference}`}
            className="stroke-emerald-500"
          />
        </svg>
        <span aria-hidden="true" className="absolute inset-0 grid place-items-center text-sm font-bold text-navy-900">
          {score.toFixed(1)}
        </span>
      </div>
      <span className="text-xs font-medium text-navy-600">{label}</span>
    </div>
  );
}

export function RatingsReviews({ projectName, locality, ratings, reviews }: Props) {
  const reviewList = reviews ?? [];
  if (!ratings && reviewList.length === 0) return null;

  return (
    <div>
      {ratings ? (
        <div className="rounded-card-lg border border-navy-100 bg-white p-6 shadow-card sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <p className="inline-flex items-center gap-1.5 rounded-lg bg-navy-900 px-3 py-1.5 text-sm font-bold text-white">
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="size-4 text-brand-400">
                <path d="M10 2.5 12 7l4.5.5-3.25 3.25.9 4.75L10 13.25 5.85 15.5l.9-4.75L3.5 7.5 8 7l2-4.5Z" />
              </svg>
              {ratings.overall.toFixed(1)} / 5
            </p>
            <p className="text-sm text-navy-500">
              {projectName} ratings and reviews &middot; {locality} &middot; {ratings.count} reviews
            </p>
          </div>

          {ratings.categories.length > 0 ? (
            <div className="mt-6">
              <h3 className="text-sm font-bold text-navy-900">Ratings based on features</h3>
              <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {ratings.categories.map((category) => (
                  <ScoreRing key={category.label} score={category.score} label={category.label} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {reviewList.length > 0 ? (
        <div className="mt-6">
          <h3 className="text-sm font-bold text-navy-900">
            All resident reviews ({reviewList.length})
          </h3>
          <ul className="mt-4 grid gap-4 lg:grid-cols-2">
            {reviewList.map((review) => (
              <li key={`${review.author}-${review.date}`} className="rounded-card-lg border border-navy-100 bg-white p-5 shadow-card sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-navy-900">{review.author}</p>
                    <p className="mt-0.5 text-xs text-navy-500">
                      {review.role} &middot; {review.date}
                    </p>
                  </div>
                  <p className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                    {review.rating}
                    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="size-3">
                      <path d="M10 2.5 12 7l4.5.5-3.25 3.25.9 4.75L10 13.25 5.85 15.5l.9-4.75L3.5 7.5 8 7l2-4.5Z" />
                    </svg>
                  </p>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Good things here
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy-700">{review.pros}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      Things need improvement
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy-700">{review.cons}</p>
                  </div>
                </div>
                {review.helpful > 0 ? (
                  <p className="mt-4 border-t border-navy-100 pt-3 text-xs text-navy-500">
                    {review.helpful} {review.helpful === 1 ? "person" : "people"} found this review helpful
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
