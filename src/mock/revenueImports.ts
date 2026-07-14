export interface RevenueImportStepConfig {
  id: string;
  title: string;
  description: string;
  status: "complete" | "current" | "pending";
}

export interface RevenueImportException {
  id: string;
  code: string;
  suggestedMatch: string;
  confidence: number;
}

export const stepConfigs: RevenueImportStepConfig[] = [
  {
    id: "upload",
    title: "Upload Revenue Statement",
    description: "Add the source file for the revenue import workflow.",
    status: "complete",
  },
  {
    id: "validate",
    title: "Validate File",
    description: "Review file structure and required fields.",
    status: "current",
  },
  {
    id: "exceptions",
    title: "Resolve Exceptions",
    description: "Address validation issues before continuing.",
    status: "pending",
  },
  {
    id: "preview",
    title: "Preview Accounting Batch",
    description: "Review the draft batch before generation.",
    status: "pending",
  },
  {
    id: "generate",
    title: "Generate Batch",
    description: "Create the accounting batch for review.",
    status: "pending",
  },
];

export const mockExceptions: RevenueImportException[] = [
  {
    id: "north",
    code: "NORTH-117",
    suggestedMatch: "North Fork Unit",
    confidence: 96,
  },
  {
    id: "mesa",
    code: "MESA-FED-4",
    suggestedMatch: "Mesa Federal 4H",
    confidence: 92,
  },
];

export const previewEntries = [
  { account: "4010 - Sales Revenue", debit: 1248500, credit: 0 },
  { account: "2310 - Taxes Payable", debit: 0, credit: 98420 },
  { account: "1100 - Accounts Receivable", debit: 0, credit: 1150080 },
  { account: "4010 - Sales Revenue", debit: 0, credit: 1248500 },
];
