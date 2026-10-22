import type { IconType } from "react-icons";

type EmptyStateProps = {
  icon: IconType;
  title: string;
  description: string;
};

export default function EmptyState({
  icon: Icon,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-primary-light text-secondary">
        <Icon aria-hidden="true" className="size-6" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-primary">{title}</h3>
      <p className="mt-1.5 text-sm leading-6 text-text-secondary">
        {description}
      </p>
    </div>
  );
}
