type WorkflowHeaderProps = {
  title: string;
  subtitle?: string;
  currentStep: number;
  totalSteps: number;
};

export default function WorkflowHeader({ title, subtitle, currentStep, totalSteps }: WorkflowHeaderProps) {
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="border-b border-gray-200 pb-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          {subtitle ? <p className="mt-1 text-sm text-gray-600">{subtitle}</p> : null}
        </div>
        <div className="text-sm text-gray-600">
          Step {currentStep} of {totalSteps}
        </div>
      </div>

      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
          <span>Overall progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100">
          <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
