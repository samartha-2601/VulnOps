import type { ReactNode } from "react";

import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({
  children,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl p-6">
        {children}
      </main>
    </div>
  );
}