"use client";

import { Suspense } from "react";
import { Payment } from "../../views/Payment";

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-transparent flex flex-col justify-center items-center py-20">
        <p className="text-slate-600 dark:text-slate-400 font-medium text-xs">Loading payment checkout...</p>
      </div>
    }>
      <Payment />
    </Suspense>
  );
}
