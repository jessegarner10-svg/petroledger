"use client";

import { useMemo, useState } from "react";
import Workflow from "../../../components/workflow/Workflow";
import WorkflowContent from "../../../components/workflow/WorkflowContent";
import WorkflowFooter from "../../../components/workflow/WorkflowFooter";
import WorkflowHeader from "../../../components/workflow/WorkflowHeader";
import WorkflowStepList, { type WorkflowStepStatus } from "../../../components/workflow/WorkflowStepList";

type StepConfig = {
  id: string;
  title: string;
  description: string;
  status: WorkflowStepStatus;
};

const stepConfigs: StepConfig[] = [
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

export default function RevenueImportPage() {
  const [currentStep, setCurrentStep] = useState(2);

  const steps = useMemo(() => stepConfigs.map((step, index) => ({
    id: step.id,
    title: step.title,
    status: (index + 1 < currentStep ? "complete" : index + 1 === currentStep ? "current" : "pending") as "complete" | "current" | "pending",
  })), [currentStep]);

  const content = (steps[currentStep - 1] ?? steps[0]) as (typeof steps)[number] & { description?: string };

  const handleNext = () => {
    setCurrentStep((value) => Math.min(steps.length, value + 1));
  };

  const handlePrevious = () => {
    setCurrentStep((value) => Math.max(1, value - 1));
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
          <div className="rounded-md border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600">
            This is a placeholder view for the workflow step. Uploading, parsing, and validation are intentionally not implemented.
          </div>
        </WorkflowContent>
      }
      footer={
        <WorkflowFooter
          canGoPrevious={currentStep > 1}
          canGoNext={currentStep < steps.length}
          canFinish={currentStep === steps.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onCancel={() => setCurrentStep(1)}
          onFinish={() => setCurrentStep(steps.length)}
        />
      }
    />
  );
}
