"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AjoMark from "../_ui/AjoMark";
import AuthDivider from "./auth/AuthDivider";
import AuthField from "./auth/AuthField";
import AuthImagePanel from "./auth/AuthImagePanel";
import GoogleSignInButton from "./auth/GoogleSignInButton";

type AuthPageProps = { mode: "login" | "signup" };

export default function AuthPage({ mode }: AuthPageProps) {
  const router = useRouter();
  const signup = mode === "signup";
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
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
        <AuthImagePanel />

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
              <AuthField
                id="password"
                label="Password"
                type="password"
                autoComplete={signup ? "new-password" : "current-password"}
                value={values.password}
                onChange={set("password")}
                error={errors.password}
                action={
                  !signup && (
                    <button
                      type="button"
                      disabled
                      title="Password reset"
                      aria-label="Forgot password?"
                      className="text-xs font-semibold text-secondary/70 underline decoration-secondary/30 underline-offset-4 cursor-not-allowed"
                    >
                      Forgot password?
                    </button>
                  )
                }
              />
              {signup && (
                <AuthField
                  id="confirm"
                  label="Confirm password"
                  type="password"
                  autoComplete="new-password"
                  value={values.confirm}
                  onChange={set("confirm")}
                  error={errors.confirm}
                />
              )}
              <button
                type="submit"
                className="flex h-[3.25rem] w-full cursor-pointer items-center justify-center rounded-xl bg-button-primary px-5 text-sm font-bold text-button-primary-text shadow-[0_0.5rem_1.125rem_rgb(74_48_38_/_14%)] transition-colors hover:bg-button-primary-hover focus-visible:outline-3 focus-visible:outline-focus focus-visible:outline-offset-3 active:translate-y-px"
              >
                {signup ? "Create account" : "Sign in"}
              </button>
            </form>

            <AuthDivider
              label={signup ? "or sign up with" : "or continue with"}
            />
            <GoogleSignInButton />
            {signup && (
              <p className="mt-5 text-center text-[0.6875rem] leading-5 text-text-muted">
                By creating an account, you agree to our Terms and Privacy
                Policy.
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
