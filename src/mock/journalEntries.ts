export type ValidationTone = "success" | "warning";

export interface ValidationItem {
  id: string;
  tone: ValidationTone;
  title: string;
  detail?: string;
}

export interface JournalRow {
  account: string;
  description: string;
  debit: number;
  credit: number;
  property: string;
  reference: string;
}

export const validationItems: ValidationItem[] = [
  {
    id: "debits-credits",
    tone: "success",
    title: "Debits equal Credits",
  },
  {
    id: "accounting-period",
    tone: "success",
    title: "Accounting Period Open",
  },
  {
    id: "properties",
    tone: "success",
    title: "All Properties Matched",
  },
  {
    id: "coa",
    tone: "success",
    title: "Chart of Accounts Valid",
  },
  {
    id: "property-acceptances",
    tone: "warning",
    title: "Two property matches were accepted during import",
    detail: "Review completed for North Fork and Mesa Federal 4H.",
  },
];

export const journalRows: JournalRow[] = [
  {
    account: "1100 - Accounts Receivable",
    description: "July purchaser statement billing",
    debit: 1248500,
    credit: 0,
    property: "North Fork Unit",
    reference: "REV-24013-001",
  },
  {
    account: "4010 - Sales Revenue",
    description: "Revenue recognition from July statement",
    debit: 0,
    credit: 1185000,
    property: "North Fork Unit",
    reference: "REV-24013-002",
  },
  {
    account: "2310 - Taxes Payable",
    description: "Tax withholding on July settlement",
    debit: 0,
    credit: 63500,
    property: "North Fork Unit",
    reference: "REV-24013-003",
  },
  {
    account: "1100 - Accounts Receivable",
    description: "July purchaser statement billing",
    debit: 0,
    credit: 65000,
    property: "Mesa Federal 4H",
    reference: "REV-24013-004",
  },
  {
    account: "4010 - Sales Revenue",
    description: "Revenue recognition from July statement",
    debit: 65000,
    credit: 0,
    property: "Mesa Federal 4H",
    reference: "REV-24013-005",
  },
  {
    account: "2400 - Accrued Deductions",
    description: "Leasehold deduction reserve",
    debit: 0,
    credit: 12000,
    property: "Mesa Federal 4H",
    reference: "REV-24013-006",
  },
];
