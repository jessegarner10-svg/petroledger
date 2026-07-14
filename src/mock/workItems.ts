export interface WorkItem {
  id: string;
  title: string;
  priority: string;
  status: string;
  module: string;
  effort: string;
  href?: string;
}

export interface BatchReadyRow {
  id: string;
  batch: string;
  source: string;
  period: string;
  createdBy: string;
  status: string;
  debit: string;
  credit: string;
  balanced: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  time: string;
}

export interface QuickAction {
  label: string;
  href: string;
}

export const workItems: WorkItem[] = [
  {
    id: "rev-24013",
    title: "Review Revenue Batch REV-24013",
    priority: "High",
    status: "Needs review",
    module: "Revenue",
    effort: "10 min",
    href: "/accounting/batches/REV-24013",
  },
  {
    id: "ap-24008",
    title: "Review AP Batch AP-24008",
    priority: "High",
    status: "Ready",
    module: "AP",
    effort: "8 min",
    href: "/accounting/batches/AP-24008",
  },
  {
    id: "exceptions",
    title: "Resolve 2 Revenue Exceptions",
    priority: "Medium",
    status: "Pending",
    module: "Revenue Import",
    effort: "5 min",
  },
  {
    id: "period",
    title: "Close July Accounting Period",
    priority: "Medium",
    status: "Pending",
    module: "Accounting",
    effort: "15 min",
  },
];

export const readyToPostRows: BatchReadyRow[] = [
  {
    id: "1",
    batch: "REV-24013",
    source: "Revenue",
    period: "July 2026",
    createdBy: "M. Alvarez",
    status: "Ready",
    debit: "$1,248,500.00",
    credit: "$1,248,500.00",
    balanced: "Yes",
  },
  {
    id: "2",
    batch: "AP-24008",
    source: "AP",
    period: "July 2026",
    createdBy: "R. Bell",
    status: "Ready",
    debit: "$98,420.00",
    credit: "$98,420.00",
    balanced: "Yes",
  },
  {
    id: "3",
    batch: "MN-24022",
    source: "Manual",
    period: "July 2026",
    createdBy: "S. Peters",
    status: "Ready",
    debit: "$12,500.00",
    credit: "$12,500.00",
    balanced: "Yes",
  },
];

export const recentActivity: ActivityItem[] = [
  { id: "1", title: "Revenue Batch REV-24013 created", time: "10 min ago" },
  { id: "2", title: "Invoice AP-24008 approved", time: "24 min ago" },
  { id: "3", title: "Journal JE-1052 posted", time: "1 hr ago" },
  { id: "4", title: "Property North Fork Unit updated", time: "2 hr ago" },
];

export const quickActions: QuickAction[] = [
  { label: "Import Revenue", href: "/revenue/import" },
  { label: "Create Invoice", href: "/expenses" },
  { label: "Review Batch Queue", href: "/accounting/batches" },
  { label: "Generate Accruals", href: "/accounting" },
  { label: "Create Manual Journal", href: "/accounting" },
];
