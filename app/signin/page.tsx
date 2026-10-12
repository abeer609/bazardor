"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import React, { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) setError(error.message || "সাইন ইন করা যায়নি।");
    } catch {
      setError("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  async function socialSignIn(provider: "google" | "github") {
    setError("");

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) setError(error.message || "সাইন ইন করা যায়নি।");
    } catch {
      setError("সোশ্যাল সাইন ইন ব্যর্থ হয়েছে।");
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-136px)] flex-col items-center bg-[#f0f5f0] px-4 pt-10 pb-16">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-extrabold text-ink">সাইন ইন</h1>
        <p className="mt-1.5 text-sm text-muted">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <section className="w-full max-w-105 rounded-2xl border border-line bg-paper p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
              ইমেইল
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-10 w-full rounded-lg border border-line bg-transparent px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium"
            >
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-10 w-full rounded-lg border border-line bg-transparent px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-rise-soft p-3 text-sm text-rise"
            >
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="h-10 w-full rounded-lg bg-brand text-sm font-semibold text-white shadow-md transition hover:bg-brand-dark disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-4">
          <div className="h-px flex-1 bg-line" />
          <span className="text-xs text-muted">অথবা</span>
          <div className="h-px flex-1 bg-line" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => socialSignIn("google")}
            className="flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-line px-2 text-xs font-semibold hover:bg-brand-soft sm:text-sm"
          >
            <SiGoogle height="13" width="13" />
            Google দিয়ে চালিয়ে যান
          </button>

          <button
            type="button"
            onClick={() => socialSignIn("github")}
            className="flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-line px-2 text-xs font-semibold hover:bg-brand-soft sm:text-sm"
          >
            <SiGithub height={13} width={13} />
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="mt-4 text-center text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-medium text-brand hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </section>

      <Link href="/" className="mt-6 text-sm text-muted hover:text-brand">
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
