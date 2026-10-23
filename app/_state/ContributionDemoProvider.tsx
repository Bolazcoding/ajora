"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  activeAjoGroup,
  ajoMembers,
  contributionCycles,
  contributionRecords as initialContributionRecords,
  type ContributionRecord,
} from "../_data/mockData";

export type RecordContributionInput = {
  memberId: string;
  cycleId: string;
  amount: number;
  paidAt: string;
};

export type RecordContributionResult =
  | {
      ok: true;
      action: "added" | "updated";
      record: ContributionRecord;
    }
  | { ok: false; error: string };

type ContributionDemoContextValue = {
  contributionRecords: readonly ContributionRecord[];
  recordContribution: (
    input: RecordContributionInput,
  ) => RecordContributionResult;
};

type ApplyContributionResult = {
  contributionRecords: readonly ContributionRecord[];
  result: RecordContributionResult;
};

export function applyDemoContribution(
  records: readonly ContributionRecord[],
  input: RecordContributionInput,
): ApplyContributionResult {
  if (!Number.isSafeInteger(input.amount) || input.amount <= 0) {
    return {
      contributionRecords: records,
      result: { ok: false, error: "Enter a valid whole-naira amount." },
    };
  }
  if (input.amount !== activeAjoGroup.contributionAmount) {
    return {
      contributionRecords: records,
      result: {
        ok: false,
        error: `The contribution for this group is ${new Intl.NumberFormat(
          "en-NG",
          {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0,
          },
        ).format(activeAjoGroup.contributionAmount)}.`,
      },
    };
  }

  const member = ajoMembers.find(
    (item) =>
      item.id === input.memberId &&
      item.groupId === activeAjoGroup.id &&
      item.isActive &&
      activeAjoGroup.memberIds.includes(item.id),
  );
  if (!member) {
    return {
      contributionRecords: records,
      result: { ok: false, error: "Select an active group member." },
    };
  }

  const cycle = contributionCycles.find(
    (item) => item.id === input.cycleId && item.groupId === activeAjoGroup.id,
  );
  if (!cycle || cycle.status === "completed") {
    return {
      contributionRecords: records,
      result: { ok: false, error: "Select a current or upcoming period." },
    };
  }

  const parsedDate = new Date(`${input.paidAt}T00:00:00.000Z`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(input.paidAt) ||
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== input.paidAt ||
    !input.paidAt.startsWith(`${cycle.id}-`)
  ) {
    return {
      contributionRecords: records,
      result: {
        ok: false,
        error: "Choose a valid contribution date within the selected period.",
      },
    };
  }

  const existingRecord = records.find(
    (record) =>
      record.groupId === activeAjoGroup.id &&
      record.memberId === member.id &&
      record.cycleId === cycle.id,
  );
  if (existingRecord?.status === "paid") {
    return {
      contributionRecords: records,
      result: {
        ok: false,
        error: "This member already has a paid contribution for that period.",
      },
    };
  }

  if (existingRecord) {
    const updatedRecord: ContributionRecord = {
      ...existingRecord,
      amount: input.amount,
      status: "paid",
      paidAt: input.paidAt,
    };
    return {
      contributionRecords: records.map((record) =>
        record.id === existingRecord.id ? updatedRecord : record,
      ),
      result: { ok: true, action: "updated", record: updatedRecord },
    };
  }

  const newRecord: ContributionRecord = {
    id: `contribution-demo-${cycle.id}-${member.id}`,
    groupId: activeAjoGroup.id,
    memberId: member.id,
    cycleId: cycle.id,
    amount: input.amount,
    dueDate: cycle.contributionDueDate,
    status: "paid",
    paidAt: input.paidAt,
  };
  return {
    contributionRecords: [...records, newRecord],
    result: { ok: true, action: "added", record: newRecord },
  };
}

const ContributionDemoContext =
  createContext<ContributionDemoContextValue | null>(null);

export function ContributionDemoProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [contributionRecords, setContributionRecords] = useState<
    readonly ContributionRecord[]
  >(initialContributionRecords);

  const recordContribution = useCallback(
    (input: RecordContributionInput): RecordContributionResult => {
      const outcome = applyDemoContribution(contributionRecords, input);
      if (outcome.result.ok) {
        setContributionRecords(outcome.contributionRecords);
      }
      return outcome.result;
    },
    [contributionRecords],
  );

  return (
    <ContributionDemoContext.Provider
      value={{ contributionRecords, recordContribution }}
    >
      {children}
    </ContributionDemoContext.Provider>
  );
}

export function useContributionDemo() {
  const context = useContext(ContributionDemoContext);
  if (!context) {
    throw new Error(
      "useContributionDemo must be used within ContributionDemoProvider.",
    );
  }
  return context;
}
