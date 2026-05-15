/* eslint-disable @next/next/no-img-element */

type MediaImageProps = {
  src: string | null | undefined;
  alt: string;
  aspectRatio?: "video" | "4/3" | "16/9" | "square";
  className?: string;
};

const aspectRatioClasses: Record<NonNullable<MediaImageProps["aspectRatio"]>, string> = {
  video: "aspect-video",
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-[16/9]",
  square: "aspect-square",
};

export default function MediaImage({
  src,
  alt,
  aspectRatio = "video",
  className = "",
}: MediaImageProps) {
  const resolvedSrc = src?.trim() ? src.trim() : null;
  const aspectRatioClass = aspectRatioClasses[aspectRatio];

  return (
    <div className={`overflow-hidden rounded-[inherit] ${className}`.trim()}>
      <div className={`relative w-full ${aspectRatioClass}`}>
        {resolvedSrc ? (
          <img
            src={resolvedSrc}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background: [
                "repeating-linear-gradient(135deg, rgba(201,168,76,0.08) 0 2px, transparent 2px 16px)",
                "linear-gradient(135deg, #0f2447 0%, #162f5a 100%)",
              ].join(", "),
            }}
          >
            <div className="pointer-events-none flex select-none flex-col items-center gap-2">
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                  color: "#c9a84c",
                  opacity: 0.25,
                  letterSpacing: "0.15em",
                  fontWeight: 700,
                }}
              >
                HGC
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
