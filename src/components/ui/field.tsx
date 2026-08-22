import { cn } from "@/lib/utils";

export function Field({
  label,
  hint,
  error,
  required,
  children,
  className,
  htmlFor,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <label
        htmlFor={htmlFor}
        className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.14em] text-text-mid"
      >
        <span>
          {label}
          {required && <span className="ml-1 text-gold-600">*</span>}
        </span>
        {hint && (
          <span className="normal-case tracking-normal text-text-soft">{hint}</span>
        )}
      </label>
      {children}
      {error && (
        <p className="text-[12.5px] text-off" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClass = cn(
  "h-12 w-full rounded-sm border border-line bg-white px-4 text-[15px] text-text",
  "placeholder:text-text-soft transition-colors duration-200",
  "hover:border-line focus:border-gold-500 focus:outline-none",
);

export const textareaClass = cn(
  "min-h-28 w-full resize-y rounded-sm border border-line bg-white px-4 py-3 text-[15px] text-text",
  "placeholder:text-text-soft transition-colors duration-200",
  "hover:border-line focus:border-gold-500 focus:outline-none",
);
