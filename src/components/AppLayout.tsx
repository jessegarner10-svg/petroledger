"use client";
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen text-sm text-gray-800 bg-gray-50">
      <aside className="w-64 border-r border-gray-200 bg-white">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="border-b border-gray-200 bg-white">
          <Header />
        </header>

        <main className="p-6 overflow-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
