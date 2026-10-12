"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { ChevronDown, LogOut } from "lucide-react";
import UserAvatar from "./UserAvatar";

export default function AuthButtons() {
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleSignOut() {
    await authClient.signOut();
    setOpen(false);
  }

  if (isPending) {
    return <div className="h-9 w-28 animate-pulse rounded-lg bg-line" />;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/signin"
          className="rounded-lg border border-line bg-white px-3 py-1.5 text-sm font-medium hover:border-brand hover:text-brand sm:px-4 sm:py-2"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="rounded-lg bg-brand px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-dark sm:px-4 sm:py-2"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-4 rounded-lg px-3 py-2 text-sm font-medium text-ink transition hover:border-brand"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-soft text-brand">
          <UserAvatar url={user.image} />
        </span>

        <span className="max-w-28 truncate sm:max-w-40">
          {user.name || user.email}
        </span>

        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-xl border border-line bg-paper p-1.5 shadow-lg"
        >
          <div className="border-b border-line px-3 py-3">
            <p className="truncate text-sm font-semibold text-ink">
              {user.name}
            </p>
            <p className="truncate text-xs text-muted">{user.email}</p>
          </div>

          <Link
            href="/my-profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2.5 text-sm text-ink hover:bg-brand-soft hover:text-brand"
          >
            আমার প্রোফাইল
          </Link>

          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-rise hover:bg-rise-soft"
          >
            <LogOut size={16} />
            সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}
