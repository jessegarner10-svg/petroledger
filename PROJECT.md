# PetroLedger

## Vision

PetroLedger is a modern cloud-based oil and gas accounting platform.

The goal is not to recreate Enertia.

The goal is to build what Enertia would look like if it were designed today.

PetroLedger should prioritize speed, usability, clarity, automation, and auditability while remaining familiar to accountants and operations personnel.

---

# Primary Objectives

PetroLedger will eventually support:

- Property Management
- Well Management
- Production Accounting
- Revenue Accounting
- Expense Management
- Joint Interest Billing (JIB)
- General Ledger
- Hedge Management
- Reporting
- Document Management
- Workflow Automation
- User Management
- Audit Logging

---

# Design Philosophy

PetroLedger is professional software.

It should feel similar to:

- Bloomberg Terminal
- Microsoft Dynamics
- Modern ERP software

It should NOT feel like:

- A marketing website
- A startup dashboard
- A mobile-first application
- Social media

---

# User Experience Principles

Always prioritize:

- Speed
- Simplicity
- Readability
- Keyboard efficiency
- Minimal clicks
- Spreadsheet-style workflows

Users should spend most of their day inside data grids instead of oversized dashboard cards.

---

# Development Rules

Every new feature should satisfy these rules.

1. Keep components modular.

2. Avoid duplicate code.

3. Build reusable components whenever practical.

4. Do not introduce unnecessary dependencies.

5. Keep business logic separate from presentation.

6. Never hardcode values that should eventually come from a database.

7. Every feature should be understandable by another developer.

8. Favor clarity over cleverness.

---

# UI Standards

Preferred appearance:

- Compact
- Desktop-first
- Professional
- Neutral colors
- Consistent spacing
- Small status badges
- Spreadsheet-style tables

Avoid:

- Large rounded cards
- Excessive whitespace
- Decorative gradients
- Oversized typography
- Flashy animations

---

# AI Development Rules

AI assistants working on PetroLedger should:

Understand the requested task before writing code.

Only modify files necessary for the requested feature.

Avoid unrelated refactoring.

Avoid changing application architecture without approval.

Explain significant architectural changes before implementing them.

Preserve backwards compatibility whenever practical.

---

# Versioning

Development versions:

0.x.x = Development

1.x.x = Production

---

# Long-Term Goal

Create the most intuitive oil and gas accounting platform available while maintaining enterprise-grade reliability and auditability.
