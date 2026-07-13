"use client";
export default function UserAvatar() {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">PL</div>
      <div className="hidden sm:block text-sm text-gray-700">Petro Admin</div>
    </div>
  );
}
