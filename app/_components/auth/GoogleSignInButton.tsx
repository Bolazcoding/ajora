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
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.9-5.92l-7.58-5.88c-2.1 1.4-4.78 2.23-8.32 2.23-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
      />
    </svg>
  );
}

export default function GoogleSignInButton() {
  return (
    <button
      type="button"
      aria-label="Continue with Google (not connected yet)"
      title="Google sign-in will be available soon"
      className="flex h-[3.125rem] w-full items-center justify-center gap-3 rounded-xl border border-border bg-white text-sm font-semibold text-text-primary transition-colors hover:border-border-strong hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
    >
      <GoogleMark />
      Continue with Google
    </button>
  );
}
