"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { FiCheckCircle, FiX } from "react-icons/fi";
import {
  activeAjoGroup,
  ajoMembers,
  contributionCycles,
} from "../_data/mockData";
import {
  getAvailableContributionCycles,
  getContributionCycleDateRange,
  hasPaidContributionRecord,
  validateRecordContributionForm,
  type RecordContributionFormErrors,
} from "../_lib/calculations/record-contribution";
import { getActiveGroupMembers } from "../_lib/calculations/shared";
import { useContributionDemo } from "../_state/ContributionDemoProvider";
import { formatNaira } from "../_ui/formatters";

type RecordContributionDialogProps = {
  onClose: () => void;
};

export default function RecordContributionDialog({
  onClose,
}: RecordContributionDialogProps) {
  const { contributionRecords, recordContribution } = useContributionDemo();
  const availableCycles = getAvailableContributionCycles(
    contributionCycles,
    activeAjoGroup,
  );
  const [memberId, setMemberId] = useState("");
  const [cycleId, setCycleId] = useState(activeAjoGroup.currentCycleId);
  const [amount, setAmount] = useState(
    String(activeAjoGroup.contributionAmount),
  );
  const [paidAt, setPaidAt] = useState(
    contributionCycles.find(
      (cycle) => cycle.id === activeAjoGroup.currentCycleId,
    )?.contributionDueDate ?? "",
  );
  const [errors, setErrors] = useState<RecordContributionFormErrors>({});
  const [success, setSuccess] = useState<{
    message: string;
    amount: number;
  } | null>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const onCloseRef = useRef(onClose);
  const selectedCycle = availableCycles.find((cycle) => cycle.id === cycleId);
  const cycleDateRange = getContributionCycleDateRange(cycleId);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const opener =
      document.activeElement instanceof HTMLElement &&
      document.activeElement !== document.body
        ? document.activeElement
        : null;
    const previousInertValues = new Map<HTMLElement, boolean>();

    let current: HTMLElement = dialog;
    while (current.parentElement) {
      const parent = current.parentElement;
      for (const child of Array.from(parent.children)) {
        if (child instanceof HTMLElement && child !== current) {
          previousInertValues.set(child, child.inert);
          child.inert = true;
        }
      }
      current = parent;
      if (parent === document.body) break;
    }

    const getFocusableElements = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (element) =>
          !element.hasAttribute("hidden") &&
          element.getAttribute("aria-hidden") !== "true",
      );

    const initialFocus =
      dialog.querySelector<HTMLElement>("[data-dialog-initial-focus]") ??
      getFocusableElements()[0] ??
      dialog;
    initialFocus.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (!first || !last) {
        event.preventDefault();
        dialog!.focus();
        return;
      }

      const activeElement = document.activeElement;
      if (!dialog!.contains(activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      for (const [element, wasInert] of previousInertValues) {
        element.inert = wasInert;
      }
      if (opener?.isConnected) opener.focus();
    };
  }, []);

  useEffect(() => {
    if (success) successHeadingRef.current?.focus();
  }, [success]);

  const activeMembers = getActiveGroupMembers(ajoMembers, activeAjoGroup);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { errors: nextErrors, parsedAmount } = validateRecordContributionForm(
      {
        memberId,
        cycleId,
        amount,
        paidAt,
        selectedCycle,
        contributionAmount: activeAjoGroup.contributionAmount,
        formattedContributionAmount: formatNaira(
          activeAjoGroup.contributionAmount,
        ),
        groupId: activeAjoGroup.id,
        contributionRecords,
      },
    );

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSuccess(null);
      return;
    }

    const result = recordContribution({
      memberId,
      cycleId,
      amount: parsedAmount,
      paidAt,
    });
    if (!result.ok) {
      setErrors({ date: result.error });
      setSuccess(null);
      return;
    }

    setErrors({});
    setSuccess({
      message:
        result.action === "added"
          ? "Contribution added."
          : "Contribution recorded. The existing unpaid record was marked paid.",
      amount: result.record.amount,
    });
  }

  function fieldClass(hasError: boolean) {
    return `mt-1.5 h-11 w-full rounded-xl border bg-white px-3 text-sm text-text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-focus/20 ${hasError ? "border-danger" : "border-border"}`;
  }

  function errorText(error?: string) {
    return error ? (
      <span className="mt-1 block text-xs text-danger" role="alert">
        {error}
      </span>
    ) : null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#30251f]/55 p-4 backdrop-blur-[2px]">
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="record-contribution-title"
        aria-describedby="record-contribution-description"
        tabIndex={-1}
        className="my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface-soft shadow-[0_1.5rem_4rem_rgb(48_37_31_/_28%)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
          <div>
            <h2
              id="record-contribution-title"
              className="text-lg font-semibold text-primary"
            >
              Record contribution
            </h2>
            <p
              id="record-contribution-description"
              className="mt-1 text-sm text-text-secondary"
            >
              {activeAjoGroup.name}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close record contribution dialog"
            className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg text-text-secondary hover:bg-primary-light hover:text-primary focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
          >
            <FiX aria-hidden="true" className="size-5" />
          </button>
        </div>

        {success ? (
          <div className="px-5 py-8 text-center sm:px-6">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-success-bg text-success">
              <FiCheckCircle aria-hidden="true" className="size-6" />
            </span>
            <h3
              ref={successHeadingRef}
              tabIndex={-1}
              className="mt-4 text-base font-semibold text-primary"
            >
              {success.message}
            </h3>
            <p className="mt-2 text-sm text-text-secondary">
              {formatNaira(success.amount)} was applied to the selected period.
              Dashboard totals and payment status now reflect this contribution.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 min-h-11 cursor-pointer rounded-xl bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4 px-5 py-5 sm:px-6">
              <label className="block text-sm font-medium text-text-primary">
                Member
                <select
                  data-dialog-initial-focus
                  value={memberId}
                  onChange={(event) => {
                    setMemberId(event.target.value);
                    setErrors((current) => ({ ...current, member: undefined }));
                  }}
                  aria-invalid={Boolean(errors.member)}
                  aria-describedby={
                    errors.member ? "contribution-member-error" : undefined
                  }
                  className={`${fieldClass(Boolean(errors.member))} cursor-pointer`}
                >
                  <option value="">Select a member</option>
                  {activeMembers.map((member) => (
                    <option
                      key={member.id}
                      value={member.id}
                      disabled={hasPaidContributionRecord(
                        contributionRecords,
                        activeAjoGroup.id,
                        member.id,
                        cycleId,
                      )}
                    >
                      {member.fullName}
                      {hasPaidContributionRecord(
                        contributionRecords,
                        activeAjoGroup.id,
                        member.id,
                        cycleId,
                      )
                        ? " — already paid"
                        : ""}
                    </option>
                  ))}
                </select>
                {errors.member && (
                  <span
                    id="contribution-member-error"
                    className="mt-1 block text-xs text-danger"
                    role="alert"
                  >
                    {errors.member}
                  </span>
                )}
              </label>

              <label className="block text-sm font-medium text-text-primary">
                Contribution period
                <select
                  value={cycleId}
                  onChange={(event) => {
                    const nextCycleId = event.target.value;
                    const nextCycle = availableCycles.find(
                      (cycle) => cycle.id === nextCycleId,
                    );
                    setCycleId(nextCycleId);
                    setPaidAt(nextCycle?.contributionDueDate ?? "");
                    setErrors((current) => ({
                      ...current,
                      cycle: undefined,
                      date: undefined,
                      member: undefined,
                    }));
                  }}
                  aria-invalid={Boolean(errors.cycle)}
                  className={`${fieldClass(Boolean(errors.cycle))} cursor-pointer`}
                >
                  {availableCycles.map((cycle) => (
                    <option key={cycle.id} value={cycle.id}>
                      {cycle.label}
                    </option>
                  ))}
                </select>
                {errorText(errors.cycle)}
              </label>

              <label className="block text-sm font-medium text-text-primary">
                Amount (NGN)
                <input
                  type="number"
                  inputMode="numeric"
                  min="1"
                  step="1"
                  value={amount}
                  onChange={(event) => {
                    setAmount(event.target.value);
                    setErrors((current) => ({ ...current, amount: undefined }));
                  }}
                  aria-invalid={Boolean(errors.amount)}
                  aria-describedby={
                    errors.amount ? "contribution-amount-error" : undefined
                  }
                  className={fieldClass(Boolean(errors.amount))}
                  placeholder={String(activeAjoGroup.contributionAmount)}
                />
                {errors.amount && (
                  <span
                    id="contribution-amount-error"
                    className="mt-1 block text-xs text-danger"
                    role="alert"
                  >
                    {errors.amount}
                  </span>
                )}
                <span className="mt-1 block text-xs font-normal text-text-muted">
                  Full group contribution:{" "}
                  {formatNaira(activeAjoGroup.contributionAmount)}
                </span>
              </label>

              <label className="block text-sm font-medium text-text-primary">
                Contribution date
                <input
                  type="date"
                  value={paidAt}
                  min={cycleDateRange.min}
                  max={cycleDateRange.max}
                  onChange={(event) => {
                    setPaidAt(event.target.value);
                    setErrors((current) => ({ ...current, date: undefined }));
                  }}
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={
                    errors.date ? "contribution-date-error" : undefined
                  }
                  className={fieldClass(Boolean(errors.date))}
                  required
                />
                {errors.date && (
                  <span
                    id="contribution-date-error"
                    className="mt-1 block text-xs text-danger"
                    role="alert"
                  >
                    {errors.date}
                  </span>
                )}
                <span className="mt-1 block text-xs font-normal text-text-muted">
                  Select a date in{" "}
                  {selectedCycle?.label ?? "the selected period"}.
                </span>
              </label>
            </div>
            <div className="flex flex-col-reverse gap-3 border-t border-border px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
              <button
                type="button"
                onClick={onClose}
                className="min-h-11 cursor-pointer rounded-xl border border-border bg-white px-5 text-sm font-semibold text-text-secondary transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="min-h-11 cursor-pointer rounded-xl bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
              >
                Record contribution
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
