export type BatchStatus = "DRAFT" | "READY" | "POSTED" | "VOID";

export type BatchSource =
  | "MANUAL"
  | "REVENUE"
  | "AP"
  | "AR"
  | "PRODUCTION"
  | "JIB"
  | "ACCRUAL"
  | "HEDGE";

export interface Batch {
  id: string;
  batchNumber: string;
  description: string;
  accountingPeriod: string; // e.g. "2026-07" or ISO month
  source: BatchSource;
  status: BatchStatus;
  entryCount: number;
  debitTotal: number; // monetary values (numbers)
  creditTotal: number; // monetary values (numbers)
  createdBy: string;
  createdAt: string; // ISO datetime
  postedBy?: string | null;
  postedAt?: string | null; // ISO datetime
}
