export interface AccountingPeriod {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: "OPEN" | "CLOSED";
}

export type BatchStatus = "DRAFT" | "READY" | "POSTED" | "VOID";

export type BatchSource =
  | "REVENUE"
  | "AP"
  | "AR"
  | "PRODUCTION"
  | "ACCRUAL"
  | "HEDGE"
  | "MANUAL"
  | "JIB";

export interface Batch {
  id: string;
  batchNumber: string;
  description: string;
  accountingPeriodId: string;
  source: BatchSource;
  status: BatchStatus;
  entryCount: number;
  debitTotal: number;
  creditTotal: number;
  createdBy: string;
  createdAt: string;
  postedBy: string;
  postedAt: string;
}

export interface JournalEntry {
  id: string;
  batchId: string;
  description: string;
  entryDate: string;
}

export interface JournalLine {
  id: string;
  journalEntryId: string;
  accountNumber: string;
  description: string;
  debit: number;
  credit: number;
  propertyId: string;
  wellId: string;
  ownerId: string;
}
