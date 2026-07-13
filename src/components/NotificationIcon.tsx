"use client";
export default function NotificationIcon() {
  return (
    <button
      aria-label="Notifications"
      className="p-2 rounded hover:bg-gray-100 text-gray-600"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15 17H9m6 0a3 3 0 01-6 0" />
        <path d="M18 8a6 6 0 10-12 0c0 7-3 8-3 8h18s-3-1-3-8" />
      </svg>
    </button>
  );
}
