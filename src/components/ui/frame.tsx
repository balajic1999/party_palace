import { cn, hash } from "@/lib/utils";

/**
 * Stand-in for photography that hasn't been shot yet.
 *
 * Deliberately not a grey box: it renders a dark, warm "lit screen in a room"
 * plate from the seed, so the page looks finished during the client demo.
 * When real photos arrive, set `src` on the entry in src/content/*.
 */

const PLATES = [
  "linear-gradient(160deg, #5a2a49 0%, #3d1d33 55%, #2e1526 100%)",
  "linear-gradient(150deg, #63304a 0%, #42203a 58%, #2e1526 100%)",
  "linear-gradient(170deg, #47284a 0%, #341c33 55%, #2e1526 100%)",
  "linear-gradient(155deg, #6b3550 0%, #45213a 50%, #2e1526 100%)",
];

export function Frame({
  src,
  alt,
  seed,
  label,
  ratio = "aspect-[4/3]",
  fill = false,
  className,
  children,
}: {
  src?: string;
  alt: string;
  seed: string;
  label?: string;
  ratio?: string;
  fill?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const h = hash(seed);
  const plate = PLATES[h % PLATES.length];
  const gid = seed.replace(/[^a-zA-Z0-9-]/g, "");

  return (
    <div
      className={cn(
        "isolate overflow-hidden bg-plum-900",
        fill ? "absolute inset-0" : cn("relative", ratio),
        className,
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ backgroundImage: plate }}
          role="img"
          aria-label={alt}
        >
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 400 300"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`sc-${gid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbd9c8" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#e8613c" stopOpacity="0.2" />
              </linearGradient>
              <radialGradient id={`gl-${gid}`} cx="50%" cy="34%" r="62%">
                <stop offset="0%" stopColor="#f2825f" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#f2825f" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="400" height="300" fill={`url(#gl-${gid})`} />
            {/* light thrown from the screen onto the floor */}
            <path d="M80 148 L320 148 L392 290 L8 290 Z" fill="#f2825f" opacity="0.07" />
            <rect
              x="80"
              y="44"
              width="240"
              height="104"
              rx="3"
              fill={`url(#sc-${gid})`}
              stroke="#fbd9c8"
              strokeOpacity="0.3"
            />
            {/* seat backs */}
            <g fill="#200f1b" opacity="0.8">
              <rect x="36" y="228" width="126" height="80" rx="18" />
              <rect x="238" y="228" width="126" height="80" rx="18" />
            </g>
          </svg>

          {label && (
            <span className="absolute bottom-3 left-4 font-display text-[clamp(1.1rem,3vw,1.7rem)] leading-none text-white/25">
              {label}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
