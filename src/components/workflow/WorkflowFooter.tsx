type WorkflowFooterProps = {
  onPrevious?: () => void;
  onNext?: () => void;
  onCancel?: () => void;
  onFinish?: () => void;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
  canFinish?: boolean;
};

export default function WorkflowFooter({
  onPrevious,
  onNext,
  onCancel,
  onFinish,
  canGoPrevious = true,
  canGoNext = true,
  canFinish = false,
}: WorkflowFooterProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="rounded border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          className="rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:bg-indigo-300"
        >
          Next
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onFinish}
          disabled={!canFinish}
          className="rounded bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:bg-emerald-300"
        >
          Finish
        </button>
      </div>
    </div>
  );
}
