"use client";
import { banglaDate } from "@/lib/format";

export default function BanglaDate({ className }: { className: string }) {
  return (
    <span className={className} suppressHydrationWarning>
      {banglaDate()}
    </span>
  );
}
