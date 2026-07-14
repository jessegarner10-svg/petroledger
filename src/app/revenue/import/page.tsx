"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Workflow from "../../../components/workflow/Workflow";
import WorkflowContent from "../../../components/workflow/WorkflowContent";
import WorkflowFooter from "../../../components/workflow/WorkflowFooter";
import WorkflowHeader from "../../../components/workflow/WorkflowHeader";
import WorkflowStepList, { type WorkflowStepStatus } from "../../../components/workflow/WorkflowStepList";
import { mockExceptions, previewEntries, stepConfigs } from "../../../mock/revenueImports";

type StepConfig = {
  id: string;
  title: string;
  description: string;
  status: WorkflowStepStatus;
};

export default function RevenueImportPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [sampleSelected, setSampleSelected] = useState(false);
  const [validationReviewed, setValidationReviewed] = useState(false);
  const [acceptedExceptions, setAcceptedExceptions] = useState<Record<string, boolean>>({
    north: false,
    mesa: false,
  });
  const [batchGenerated, setBatchGenerated] = useState(false);

  const steps = useMemo(() => stepConfigs.map((step, index) => ({
    id: step.id,
    title: step.title,
    status: (index + 1 < currentStep ? "complete" : index + 1 === currentStep ? "current" : "pending") as "complete" | "current" | "pending",
  })), [currentStep]);

  const content = stepConfigs[currentStep - 1] ?? stepConfigs[0];
  const canAdvanceFromStep1 = sampleSelected;
  const canAdvanceFromStep2 = validationReviewed;
  const canAdvanceFromStep3 = acceptedExceptions.north && acceptedExceptions.mesa;

  const handleNext = () => {
    if (currentStep === 1 && !canAdvanceFromStep1) return;
    if (currentStep === 2 && !canAdvanceFromStep2) return;
    if (currentStep === 3 && !canAdvanceFromStep3) return;
    setCurrentStep((value) => Math.min(steps.length, value + 1));
  };

  const handlePrevious = () => {
    setCurrentStep((value) => Math.max(1, value - 1));
  };

  const handleAcceptException = (id: string) => {
    setAcceptedExceptions((value) => ({ ...value, [id]: true }));
  };

  const handleSelectDifferentProperty = (id: string) => {
    setAcceptedExceptions((value) => ({ ...value, [id]: false }));
  };

  return (
    <Workflow
      title="Revenue Import"
      subtitle="Guide the import flow from file intake to batch generation."
      currentStep={currentStep}
      totalSteps={steps.length}
      header={<WorkflowHeader title="Revenue Import" subtitle="Guide the import flow from file intake to batch generation." currentStep={currentStep} totalSteps={steps.length} />}
      stepList={<WorkflowStepList steps={steps} />}
      content={
        <WorkflowContent
          title={content.title}
          description={content.description}
        >
          {currentStep === 1 ? (
            <div className="space-y-4">
              <div className="rounded-md border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600">
                <div className="font-medium text-gray-900">Drag and drop your revenue statement</div>
                <div className="mt-2">Excel or CSV files are supported for this mock workflow.</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="rounded border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">Select File</button>
                  <button
                    type="button"
                    onClick={() => setSampleSelected(true)}
                    className="rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white"
                  >
                    Use Sample Revenue Statement
                  </button>
                </div>
              </div>

              <div className="rounded-md border border-gray-200 bg-white p-3 text-sm text-gray-700">
                <div className="font-medium text-gray-900">Status</div>
                <div className="mt-1">{sampleSelected ? "Sample statement selected and ready to continue." : "No file selected yet."}</div>
              </div>
            </div>
          ) : null}

          {currentStep === 2 ? (
            <div className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                  <div className="font-medium">✓ 284 revenue rows found</div>
                </div>
                <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                  <div className="font-medium">✓ 282 properties matched</div>
                </div>
                <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
                  <div className="font-medium">⚠ 2 properties require review</div>
                </div>
                <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  <div className="font-medium">Accounting period: July 2026</div>
                </div>
              </div>

              <div className="rounded-md border border-gray-200 bg-white p-3 text-sm text-gray-700">
                <div className="flex items-center gap-2 font-medium text-gray-900">
                  <span className="text-emerald-600">●</span>
                  Debit and credit totals currently balanced
                </div>
                <div className="mt-2 flex items-center gap-2 font-medium text-gray-900">
                  <span className="text-amber-600">●</span>
                  Overall status: Review Required
                </div>
                <button
                  type="button"
                  onClick={() => setValidationReviewed(true)}
                  className="mt-3 rounded border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700"
                >
                  Mark Validation Reviewed
                </button>
              </div>
            </div>
          ) : null}

          {currentStep === 3 ? (
            <div className="space-y-3">
              <div className="overflow-hidden rounded-md border border-gray-200">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 text-left text-gray-600">
                    <tr>
                      <th className="px-3 py-2">Exception</th>
                      <th className="px-3 py-2">Suggested Match</th>
                      <th className="px-3 py-2">Confidence</th>
                      <th className="px-3 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockExceptions.map((exception) => (
                      <tr key={exception.id} className="border-t border-gray-200 bg-white">
                        <td className="px-3 py-2 text-gray-700">Purchaser property code {exception.code}</td>
                        <td className="px-3 py-2 text-gray-700">{exception.suggestedMatch}</td>
                        <td className="px-3 py-2 text-gray-700">{exception.confidence}%</td>
                        <td className="px-3 py-2">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => handleAcceptException(exception.id)}
                              className="rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-sm text-emerald-700"
                            >
                              {acceptedExceptions[exception.id] ? "Accepted" : "Accept Suggested Match"}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSelectDifferentProperty(exception.id)}
                              className="rounded border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-700"
                            >
                              Choose Different Property
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="rounded-md border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
                {canAdvanceFromStep3 ? "Both exceptions are accepted and the workflow can proceed." : "Accept both suggested matches before continuing."}
              </div>
            </div>
          ) : null}

          {currentStep === 4 ? (
            <div className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-md border border-gray-200 bg-white p-3 text-sm text-gray-700">
                  <div className="font-medium text-gray-900">Source</div>
                  <div className="mt-1">Revenue</div>
                </div>
                <div className="rounded-md border border-gray-200 bg-white p-3 text-sm text-gray-700">
                  <div className="font-medium text-gray-900">Accounting period</div>
                  <div className="mt-1">July 2026</div>
                </div>
                <div className="rounded-md border border-gray-200 bg-white p-3 text-sm text-gray-700">
                  <div className="font-medium text-gray-900">Revenue rows</div>
                  <div className="mt-1">284</div>
                </div>
                <div className="rounded-md border border-gray-200 bg-white p-3 text-sm text-gray-700">
                  <div className="font-medium text-gray-900">Properties</div>
                  <div className="mt-1">147</div>
                </div>
                <div className="rounded-md border border-gray-200 bg-white p-3 text-sm text-gray-700">
                  <div className="font-medium text-gray-900">Gross revenue</div>
                  <div className="mt-1">$1,248,500.00</div>
                </div>
                <div className="rounded-md border border-gray-200 bg-white p-3 text-sm text-gray-700">
                  <div className="font-medium text-gray-900">Taxes and deductions</div>
                  <div className="mt-1">$98,420.00</div>
                </div>
                <div className="rounded-md border border-gray-200 bg-white p-3 text-sm text-gray-700">
                  <div className="font-medium text-gray-900">Net revenue</div>
                  <div className="mt-1">$1,150,080.00</div>
                </div>
                <div className="rounded-md border border-gray-200 bg-white p-3 text-sm text-gray-700">
                  <div className="font-medium text-gray-900">Balanced</div>
                  <div className="mt-1">Yes</div>
                </div>
              </div>

              <div className="rounded-md border border-gray-200 bg-white p-3">
                <div className="mb-2 text-sm font-medium text-gray-900">Journal entry preview</div>
                <div className="overflow-hidden rounded-md border border-gray-200">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 text-left text-gray-600">
                      <tr>
                        <th className="px-3 py-2">Account</th>
                        <th className="px-3 py-2 text-right">Debit</th>
                        <th className="px-3 py-2 text-right">Credit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewEntries.map((entry) => (
                        <tr key={entry.account} className="border-t border-gray-200 bg-white">
                          <td className="px-3 py-2 text-gray-700">{entry.account}</td>
                          <td className="px-3 py-2 text-right text-gray-700">{entry.debit ? `$${entry.debit.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "—"}</td>
                          <td className="px-3 py-2 text-right text-gray-700">{entry.credit ? `$${entry.credit.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : null}

          {currentStep === 5 ? (
            <div className="space-y-4">
              {!batchGenerated ? (
                <div className="space-y-3">
                  <div className="rounded-md border border-gray-200 bg-white p-3 text-sm text-gray-700">
                    <div className="font-medium text-gray-900">Batch summary</div>
                    <div className="mt-2 space-y-1">
                      <div>Batch number: REV-24013</div>
                      <div>Description: July 2026 Revenue Import</div>
                      <div>Status: Draft</div>
                      <div>Source: Revenue</div>
                      <div>Accounting period: July 2026</div>
                      <div>Entry count: 4</div>
                      <div>Debit total: $1,248,500.00</div>
                      <div>Credit total: $1,248,500.00</div>
                      <div>Balanced: Yes</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBatchGenerated(true)}
                    className="rounded bg-emerald-600 px-3 py-2 text-sm font-medium text-white"
                  >
                    Generate Draft Batch
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                    Draft batch REV-24013 was created successfully.
                  </div>
                  <Link
                    href="/accounting/batches"
                    className="inline-flex rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white"
                  >
                    Open Batch Queue
                  </Link>
                </div>
              )}
            </div>
          ) : null}
        </WorkflowContent>
      }
      footer={
        <WorkflowFooter
          canGoPrevious={currentStep > 1}
          canGoNext={currentStep < steps.length && (currentStep === 1 ? canAdvanceFromStep1 : currentStep === 2 ? canAdvanceFromStep2 : currentStep === 3 ? canAdvanceFromStep3 : true)}
          canFinish={currentStep === steps.length && batchGenerated}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onCancel={() => {
            setCurrentStep(1);
            setSampleSelected(false);
            setValidationReviewed(false);
            setAcceptedExceptions({ north: false, mesa: false });
            setBatchGenerated(false);
          }}
          onFinish={() => setBatchGenerated(true)}
        />
      }
    />
  );
}
