"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AjoMark from "../_ui/AjoMark";

type AuthPageProps = { mode: "login" | "signup" };

function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="size-[1.125rem]">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
        transform="translate(0 4)"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.48-4.72 7.18l7.58 5.88c4.42-4.08 7.18-10.08 7.18-17.53Z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19Z"
        transform="translate(0 0)"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.9-5.92l-7.58-5.88c-2.1 1.4-4.78 2.23-8.32 2.23-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
      />
    </svg>
  );
}

function EyeControl({
  visible,
  onClick,
  label,
}: {
  visible: boolean;
  onClick: () => void;
  label: string;
}) {
  const Icon = visible ? FiEyeOff : FiEye;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`}
      aria-pressed={visible}
      className="absolute inset-y-0 right-0 grid w-12 place-items-center text-text-muted transition-colors hover:text-primary focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-focus"
    >
      <Icon aria-hidden="true" className="size-[1.125rem]" />
    </button>
  );
}

function AuthField({
  id,
  label,
  type = "text",
  autoComplete,
  value,
  onChange,
  error,
  passwordVisible,
  togglePassword,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  passwordVisible?: boolean;
  togglePassword?: () => void;
}) {
  const password = type === "password";
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.8125rem] font-semibold text-text-primary"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={password ? (passwordVisible ? "text" : "password") : type}
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          required
          className="h-[3.125rem] w-full rounded-xl border border-border bg-surface px-4 text-sm text-text-primary outline-none transition placeholder:text-text-muted hover:border-border-strong focus:border-secondary focus:ring-4 focus:ring-secondary/10 aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger/10"
        />
        {password && togglePassword && (
          <EyeControl
            visible={Boolean(passwordVisible)}
            onClick={togglePassword}
            label={label}
          />
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

export default function AuthPage({ mode }: AuthPageProps) {
  const router = useRouter();
  const signup = mode === "signup";
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (key: keyof typeof values) => (value: string) =>
    setValues((current) => ({ ...current, [key]: value }));

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!values.email.trim()) next.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Enter a valid email address.";
    if (values.password.length < 8)
      next.password = "Use at least 8 characters for your password.";
    if (signup && !values.name.trim()) next.name = "Enter your full name.";
    if (signup && values.confirm !== values.password)
      next.confirm = "Your passwords do not match.";
    setErrors(next);
    if (Object.keys(next).length === 0) router.push("/dashboard");
  }

  const heading = signup ? "Start growing together." : "Welcome back.";
  return (
    <main className="min-h-svh bg-background px-3 py-3 sm:px-5 sm:py-5 lg:grid lg:min-h-svh lg:place-items-center lg:p-6">
      <div className="mx-auto grid min-h-[calc(100svh-1.5rem)] w-full max-w-[88rem] grid-cols-1 overflow-hidden rounded-[1.5rem] border border-border/70 bg-surface shadow-[0_1.5rem_5rem_rgb(74_48_38_/_8%)] sm:min-h-[calc(100svh-2.5rem)] md:min-h-[min(54rem,calc(100svh-3rem))] md:grid-cols-[minmax(0,0.82fr)_minmax(24rem,1.18fr)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <aside
          className="relative isolate min-h-[14rem] overflow-hidden bg-[#80654d] sm:min-h-[16rem] md:min-h-0"
          aria-label="A sunlit green plant, a reminder that small steps bring greater growth"
        >
          <Image
            src="/images/growing-plants.jpg"
            alt="Green leaves in warm afternoon sunlight and soft shadows"
            fill
            priority
            unoptimized
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover [object-position:42%_center]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#251810]/65 via-[#38271c]/10 to-[#4a3026]/[0.04]"
          />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-16 text-white sm:px-9 sm:pb-8 md:px-7 md:pb-8 lg:px-10 lg:pb-11 xl:px-[4.5rem] xl:pb-[4.5rem]">
            <p className="mb-2 text-[0.5625rem] font-bold uppercase tracking-[0.18em] text-white/75 sm:mb-3 sm:text-[0.625rem]">
              BETTER, TOGETHER
            </p>
            <h2 className="max-w-[29rem] font-sans text-[clamp(1.75rem,3.3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.07rem]">
              Small steps.
              <br />
              Greater growth.
            </h2>
            <p className="mt-2 max-w-[23rem] text-xs leading-5 text-white/80 sm:mt-4 sm:text-sm sm:leading-6">
              Good things take root when we grow them together.
            </p>
          </div>
        </aside>

        <section
          className="flex min-w-0 flex-col px-6 py-7 sm:px-10 sm:py-9 md:px-8 md:py-8 lg:px-[clamp(2.75rem,6.2vw,6rem)] lg:py-10 xl:px-[6.5rem]"
          aria-labelledby="auth-heading"
        >
          <header className="flex items-center justify-between gap-3">
            <Link
              href="/"
              aria-label="Ajora home"
              className="inline-flex items-center gap-2.5 text-primary focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-4"
            >
              <span className="grid size-10 place-items-center rounded-full border border-primary/10 bg-background">
                <span className="size-6">
                  <AjoMark />
                </span>
              </span>
              <span className="font-sans text-[1.3rem] font-bold tracking-[-0.055rem]">
                Ajora
              </span>
            </Link>
            <p className="text-right text-xs text-text-secondary sm:text-[0.8125rem]">
              {signup ? "Already with us?" : "New to Ajora?"}{" "}
              <Link
                href={signup ? "/login" : "/signup"}
                className="font-bold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-focus"
              >
                {signup ? "Sign in" : "Create an account"}
              </Link>
            </p>
          </header>

          <div className="mx-auto flex w-full max-w-[25rem] flex-1 flex-col justify-center py-9 sm:py-12 lg:py-8">
            <div className="mb-7 sm:mb-8">
              <p className="mb-3 text-[0.625rem] font-bold uppercase tracking-[0.16em] text-secondary">
                A LITTLE TOGETHER GOES A LONG WAY
              </p>
              <h1
                id="auth-heading"
                className="font-sans text-[2rem] font-bold leading-[1.13] tracking-[-0.075rem] text-primary sm:text-[2.375rem]"
              >
                {heading}
              </h1>
              <p className="mt-2.5 text-sm leading-6 text-text-secondary">
                {signup
                  ? "Save with your people and turn small contributions into big possibilities."
                  : "Your Ajo journey continues here."}
              </p>
            </div>

            <form onSubmit={submit} noValidate className="space-y-[1.125rem]">
              {signup && (
                <AuthField
                  id="name"
                  label="Full name"
                  autoComplete="name"
                  value={values.name}
                  onChange={set("name")}
                  error={errors.name}
                />
              )}
              <AuthField
                id="email"
                label="Email address"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={set("email")}
                error={errors.email}
              />
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="text-[0.8125rem] font-semibold text-text-primary"
                  >
                    Password
                  </label>
                  {!signup && (
                    <Link
                      href="/login#password"
                      className="text-xs font-semibold text-secondary underline decoration-secondary/30 underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-focus"
                    >
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={signup ? "new-password" : "current-password"}
                    value={values.password}
                    onChange={(event) => set("password")(event.target.value)}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                    required
                    className="h-[3.125rem] w-full rounded-xl border border-border bg-surface px-4 pr-12 text-sm text-text-primary outline-none transition placeholder:text-text-muted hover:border-border-strong focus:border-secondary focus:ring-4 focus:ring-secondary/10 aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger/10"
                  />
                  <EyeControl
                    visible={showPassword}
                    onClick={() => setShowPassword((visible) => !visible)}
                    label="password"
                  />
                </div>
                {errors.password && (
                  <p
                    id="password-error"
                    role="alert"
                    className="mt-1.5 text-xs text-danger"
                  >
                    {errors.password}
                  </p>
                )}
              </div>
              {signup && (
                <AuthField
                  id="confirm"
                  label="Confirm password"
                  type="password"
                  autoComplete="new-password"
                  value={values.confirm}
                  onChange={set("confirm")}
                  error={errors.confirm}
                  passwordVisible={showConfirm}
                  togglePassword={() => setShowConfirm((visible) => !visible)}
                />
              )}
              <button
                type="submit"
                className="flex h-[3.25rem] w-full items-center justify-center rounded-xl bg-button-primary px-5 text-sm font-bold text-button-primary-text shadow-[0_0.5rem_1.125rem_rgb(74_48_38_/_14%)] transition-colors hover:bg-button-primary-hover focus-visible:outline-3 focus-visible:outline-focus focus-visible:outline-offset-3 active:translate-y-px"
              >
                {signup ? "Create account" : "Sign in"}
              </button>
            </form>

            <div className="my-[1.375rem] flex items-center gap-4 text-[0.6875rem] font-medium text-text-muted">
              <span className="h-px flex-1 bg-divider" />
              <span>{signup ? "or sign up with" : "or continue with"}</span>
              <span className="h-px flex-1 bg-divider" />
            </div>
            <button
              type="button"
              aria-label="Continue with Google (not connected yet)"
              title="Google sign-in will be available soon"
              className="flex h-[3.125rem] w-full items-center justify-center gap-3 rounded-xl border border-border bg-white text-sm font-semibold text-text-primary transition-colors hover:border-border-strong hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
            >
              <GoogleMark />
              Continue with Google
            </button>
            {signup && (
              <p className="mt-5 text-center text-[0.6875rem] leading-5 text-text-muted">
                By creating an account, you agree to our{" "}
                <a
                  href="#terms"
                  className="text-secondary underline underline-offset-2 hover:text-primary"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="#privacy"
                  className="text-secondary underline underline-offset-2 hover:text-primary"
                >
                  Privacy Policy
                </a>
                .
              </p>
            )}
          </div>
          <footer className="flex flex-col items-center justify-center gap-2 text-[0.6875rem] text-text-muted sm:flex-row sm:justify-between">
            <span>Save together. Grow together.</span>
            <Link
              href="/"
              className="font-semibold text-primary underline decoration-primary/25 underline-offset-4 transition-colors hover:decoration-primary focus-visible:outline-2 focus-visible:outline-focus"
            >
              Ajora home
            </Link>
          </footer>
        </section>
      </div>
    </main>
  );
}
