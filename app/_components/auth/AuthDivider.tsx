export default function AuthDivider({ label }: { label: string }) {
  return (
    <div className="my-[1.375rem] flex items-center gap-4 text-[0.6875rem] font-medium text-text-muted">
      <span className="h-px flex-1 bg-divider" />
      <span>{label}</span>
      <span className="h-px flex-1 bg-divider" />
    </div>
  );
}
