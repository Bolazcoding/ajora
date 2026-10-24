import { useState, type ReactNode } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type AuthFieldProps = {
  id: string;
  label: string;
  type?: string;
  autoComplete: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  action?: ReactNode;
};

const inputClassName =
  "h-[3.125rem] w-full rounded-xl border border-border bg-surface px-4 text-sm text-text-primary outline-none transition placeholder:text-text-muted hover:border-border-strong focus:border-secondary focus:ring-4 focus:ring-secondary/10 aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger/10";

export default function AuthField({
  id,
  label,
  type = "text",
  autoComplete,
  value,
  onChange,
  error,
  action,
}: AuthFieldProps) {
  const password = type === "password";
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label
          htmlFor={id}
          className="text-[0.8125rem] font-semibold text-text-primary"
        >
          {label}
        </label>
        {action}
      </div>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={password && visible ? "text" : type}
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          required
          className={`${inputClassName}${password ? " pr-12" : ""}`}
        />
        {password && (
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`}
            aria-pressed={visible}
            className="absolute inset-y-0 right-0 grid w-12 place-items-center text-text-muted transition-colors hover:text-primary focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-focus cursor-pointer"
          >
            {visible ? (
              <FiEyeOff aria-hidden="true" className="size-[1.125rem]" />
            ) : (
              <FiEye aria-hidden="true" className="size-[1.125rem]" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-xs text-danger"
        >
          {error}
        </p>
      )}
    </div>
  );
}
