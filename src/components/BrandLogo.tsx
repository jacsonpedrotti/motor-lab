import type { CarBrandEntry } from "@/lib/car-brands";

type BrandLogoProps = {
  brand: CarBrandEntry;
  className?: string;
};

/** Ícones simplificados para marcas fora do pacote simple-icons. */
function CustomBrandMark({ id }: { id: string }) {
  switch (id) {
    case "mercedes":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full">
          <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path
            fill="currentColor"
            d="M12 4.2 14.8 12H12l-2.8-7.8zm0 15.6-2.8-7.8H12l2.8 7.8zM5.2 12 12 8.1V12H5.2zm13.6 0H12V8.1l6.8 3.9z"
          />
        </svg>
      );
    case "jaguar":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full">
          <path
            fill="currentColor"
            d="M4 14.5c2.2-3.8 5.4-6 8-6s5.8 2.2 8 6c-2.4 1.2-5.1 1.8-8 1.8s-5.6-.6-8-1.8zm8-4.2c-1.8 0-3.4.9-4.8 2.4 1.3.5 2.8.8 4.8.8s3.5-.3 4.8-.8c-1.4-1.5-3-2.4-4.8-2.4z"
          />
          <path fill="currentColor" d="M8 15.8h8v1.4H8z" opacity="0.85" />
        </svg>
      );
    case "lexus":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full">
          <ellipse cx="12" cy="12" rx="10" ry="6.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
          <path fill="currentColor" d="M12 7.8c-2.8 0-5 1.5-5.5 3.5h11c-.5-2-2.7-3.5-5.5-3.5zm0 8.4c2.8 0 5-1.5 5.5-3.5H6.5c.5 2 2.7 3.5 5.5 3.5z" />
        </svg>
      );
    case "land-rover":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full">
          <ellipse cx="12" cy="12" rx="10.5" ry="7" fill="none" stroke="currentColor" strokeWidth="1.3" />
          <path fill="currentColor" d="M7.5 11.2h9v1.6h-9zm0 2.8h6.5v1.4H7.5z" />
        </svg>
      );
    case "dodge":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full">
          <path fill="currentColor" d="M12 4 8 10h2.2l-.4 8h4.4l-.4-8H16L12 4zm-4.5 12h9v2h-9v-2z" />
        </svg>
      );
    case "chery":
    case "caoa-chery":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full">
          <path fill="currentColor" d="M6 7.5h12v2.2H6V7.5zm0 4.3h12v2.2H6v-2.2zm2.8 4.3h6.4v2.2H8.8v-2.2z" />
        </svg>
      );
    case "jac":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full">
          <path fill="currentColor" d="M7 6.5h10v2H7v-2zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.3" />
          <path fill="currentColor" d="M9 8h6v8H9V8z" opacity="0.9" />
        </svg>
      );
  }
}

export default function BrandLogo({ brand, className = "" }: BrandLogoProps) {
  return (
    <div
      className={`flex h-8 w-8 shrink-0 items-center justify-center text-text-dim transition-colors group-hover:text-accent sm:h-9 sm:w-9 ${className}`}
      aria-hidden="true"
    >
      {brand.icon === "custom" ? (
        <CustomBrandMark id={brand.customId ?? "default"} />
      ) : (
        <svg viewBox="0 0 24 24" role="img" className="h-full w-full" fill="currentColor">
          <title>{brand.icon.title}</title>
          <path d={brand.icon.path} />
        </svg>
      )}
    </div>
  );
}
