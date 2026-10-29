"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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
import {
  isContributionForMemberCycle,
  isDateInContributionCycle,
  isPositiveWholeNairaAmount,
  isValidIsoDate,
} from "../_lib/calculations/shared";

const CONTRIBUTION_DEMO_STORAGE_KEY = "ajora:contribution-demo";
const CONTRIBUTION_DEMO_STORAGE_VERSION = 1;

type StoredContributionDemo = {
  version: typeof CONTRIBUTION_DEMO_STORAGE_VERSION;
  groupId: string;
  records: ContributionRecord[];
};

function isStoredContributionRecord(
  value: unknown,
): value is ContributionRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const record = value as Record<string, unknown>;
  if (
    typeof record.id !== "string" ||
    typeof record.groupId !== "string" ||
    typeof record.memberId !== "string" ||
    typeof record.cycleId !== "string" ||
    typeof record.amount !== "number" ||
    typeof record.dueDate !== "string" ||
    record.status !== "paid" ||
    typeof record.paidAt !== "string" ||
    record.groupId !== activeAjoGroup.id ||
    !isPositiveWholeNairaAmount(record.amount) ||
    record.amount !== activeAjoGroup.contributionAmount ||
    !isValidIsoDate(record.dueDate) ||
    !isValidIsoDate(record.paidAt)
  ) {
    return false;
  }

  const member = ajoMembers.find(
    (item) =>
      item.id === record.memberId &&
      item.groupId === activeAjoGroup.id &&
      item.isActive &&
      activeAjoGroup.memberIds.includes(item.id),
  );
  const cycle = contributionCycles.find(
    (item) => item.id === record.cycleId && item.groupId === record.groupId,
  );
  if (
    !member ||
    !cycle ||
    !isDateInContributionCycle(record.dueDate, cycle.id) ||
    !isDateInContributionCycle(record.paidAt, cycle.id)
  ) {
    return false;
  }

  const sampleRecord = initialContributionRecords.find((item) =>
    isContributionForMemberCycle(item, activeAjoGroup.id, member.id, cycle.id),
  );
  return sampleRecord
    ? record.id === sampleRecord.id && record.dueDate === sampleRecord.dueDate
    : record.id === `contribution-demo-${cycle.id}-${member.id}` &&
        record.dueDate === cycle.contributionDueDate;
}

function isStoredContributionDemo(
  value: unknown,
): value is StoredContributionDemo {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const stored = value as Record<string, unknown>;
  if (
    stored.version !== CONTRIBUTION_DEMO_STORAGE_VERSION ||
    stored.groupId !== activeAjoGroup.id ||
    !Array.isArray(stored.records) ||
    !stored.records.every((record: unknown) =>
      isStoredContributionRecord(record),
    )
  ) {
    return false;
  }

  const recordKeys = stored.records.map(
    (record: ContributionRecord) => `${record.memberId}:${record.cycleId}`,
  );
  return new Set(recordKeys).size === recordKeys.length;
}

function getContributionOverrides(
  contributionRecords: readonly ContributionRecord[],
) {
  return contributionRecords.filter((record) => {
    const sampleRecord = initialContributionRecords.find((item) =>
      isContributionForMemberCycle(
        item,
        record.groupId,
        record.memberId,
        record.cycleId,
      ),
    );

    return (
      !sampleRecord ||
      sampleRecord.id !== record.id ||
      sampleRecord.amount !== record.amount ||
      sampleRecord.status !== record.status ||
      sampleRecord.paidAt !== record.paidAt
    );
  });
}

function mergeContributionOverrides(
  overrides: readonly ContributionRecord[],
): readonly ContributionRecord[] {
  const mergedRecords = [...initialContributionRecords];

  for (const override of overrides) {
    const existingIndex = mergedRecords.findIndex((record) =>
      isContributionForMemberCycle(
        record,
        override.groupId,
        override.memberId,
        override.cycleId,
      ),
    );

    if (existingIndex >= 0) {
      const sampleRecord = mergedRecords[existingIndex];
      mergedRecords[existingIndex] = {
        ...sampleRecord,
        amount: override.amount,
        status: override.status,
        paidAt: override.paidAt,
      };
    } else {
      mergedRecords.push(override);
    }
  }

  return mergedRecords;
}

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
  if (!isPositiveWholeNairaAmount(input.amount)) {
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

  if (
    !isValidIsoDate(input.paidAt) ||
    !isDateInContributionCycle(input.paidAt, cycle.id)
  ) {
    return {
      contributionRecords: records,
      result: {
        ok: false,
        error: "Choose a valid contribution date within the selected period.",
      },
    };
  }

  const existingRecord = records.find((record) =>
    isContributionForMemberCycle(
      record,
      activeAjoGroup.id,
      member.id,
      cycle.id,
    ),
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
  const [persistenceReady, setPersistenceReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const restoreSavedDemo = () => {
      if (cancelled) return;

      let restoredRecords: readonly ContributionRecord[] | undefined;
      try {
        const serializedState = window.localStorage.getItem(
          CONTRIBUTION_DEMO_STORAGE_KEY,
        );

        if (serializedState) {
          let storedState: unknown;
          try {
            storedState = JSON.parse(serializedState);
          } catch {
            window.localStorage.removeItem(CONTRIBUTION_DEMO_STORAGE_KEY);
          }

          if (storedState !== undefined) {
            if (isStoredContributionDemo(storedState)) {
              restoredRecords = mergeContributionOverrides(storedState.records);
            } else {
              window.localStorage.removeItem(CONTRIBUTION_DEMO_STORAGE_KEY);
            }
          }
        }
      } catch {
        // Storage may be unavailable or blocked; the in-memory demo still works.
      }

      if (cancelled) return;
      if (restoredRecords) setContributionRecords(restoredRecords);
      setPersistenceReady(true);
    };

    queueMicrotask(restoreSavedDemo);
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!persistenceReady) return;

    try {
      const overrides = getContributionOverrides(contributionRecords);
      if (overrides.length === 0) {
        window.localStorage.removeItem(CONTRIBUTION_DEMO_STORAGE_KEY);
      } else {
        const storedState: StoredContributionDemo = {
          version: CONTRIBUTION_DEMO_STORAGE_VERSION,
          groupId: activeAjoGroup.id,
          records: [...overrides],
        };
        window.localStorage.setItem(
          CONTRIBUTION_DEMO_STORAGE_KEY,
          JSON.stringify(storedState),
        );
      }
    } catch {
      // Storage may be unavailable or full
    }
  }, [contributionRecords, persistenceReady]);

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
