import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-sm bg-indigo-600 flex items-center justify-center text-white font-semibold">PL</div>
      <div className="font-semibold text-gray-900">PetroLedger</div>
    </Link>
  );
}
