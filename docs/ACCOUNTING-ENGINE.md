# PetroLedger Accounting Engine

## Purpose

The Accounting Engine is the heart of PetroLedger.

Every accounting event in the system ultimately becomes one or more accounting batches.

No business module posts directly to the General Ledger.

Instead, every module generates batches that can be reviewed, validated, approved, and posted.

This creates a single, consistent accounting workflow throughout the application.

---

# Core Principle

Business Events

↓

Validation

↓

Batch Generation

↓

Review

↓

Posting

↓

General Ledger

Everything follows this workflow.

---

# Business Events

Examples include:

- Revenue Import
- Vendor Invoice
- Cash Receipt
- Production Import
- Manual Journal
- Recurring Accrual
- Hedge Settlement
- JIB Allocation
- Ownership Adjustment

Business events do not post accounting.

They generate accounting batches.

---

# Validation

Before a batch is created, PetroLedger validates:

- Required information
- Accounting period
- Property assignments
- Ownership
- Decimal balances
- Debit/Credit balance
- Required approvals

If validation fails, the batch is not created.

---

# Batch

A Batch represents a logical accounting event.

Examples:

Revenue Batch

AP Batch

AR Batch

Accrual Batch

Production Batch

Hedge Batch

Each batch contains one or more journal entries.

---

# Journal Entries

Each batch contains journal entries.

Each journal entry contains journal lines.

Journal lines contain:

- Account
- Debit
- Credit
- Property
- Well
- Owner (when applicable)
- Department
- Cost Center
- Reference
- Description

Journal entries must always balance.

---

# Posting

Posting moves a reviewed batch into the General Ledger.

Only posted batches affect financial reporting.

Draft batches never affect accounting.

---

# General Ledger

The General Ledger is the system of record.

Financial statements are generated from posted journal entries only.

Nothing bypasses the posting engine.

---

# Design Rule

Every future PetroLedger module must answer one question:

"How does this create or interact with an accounting batch?"

If it does not interact with accounting, it is supporting data.

If it does interact with accounting, it must use the Accounting Engine.