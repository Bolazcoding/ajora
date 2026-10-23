import type { PaymentStatus, PayoutStatus } from "../_data/mockData";

type StatusBadgeProps = {
  status: PaymentStatus | PayoutStatus;
};

const statusStyles: Record<StatusBadgeProps["status"], string> = {
  paid: "bg-success-bg text-success",
  completed: "bg-success-bg text-success",
  pending: "bg-warning-bg text-warning",
  upcoming: "bg-primary-light text-primary",
  overdue: "bg-danger-bg text-danger",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {label}
    </span>
  );
}
