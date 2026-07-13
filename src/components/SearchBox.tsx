"use client";
export default function SearchBox() {
  return (
    <div className="relative hidden md:flex items-center">
      <input
        placeholder="Search..."
        aria-label="Global search"
        className="px-3 py-2 w-80 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-400"
      />
    </div>
  );
}
