"use client";

import { SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { LogOut, UserRound } from "lucide-react";

type ProfileFormProps = {
  name: string;
  email: string;
  image?: string | null;
};

export default function ProfileForm({
  name: initialName,
  email,
  image,
}: ProfileFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initialName);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function handleUpdate(e: SubmitEvent) {
    e.preventDefault();
    setMessage("");
    setError("");

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("নাম লিখুন।");
      return;
    }

    setSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        setError(error.message || "প্রোফাইল আপডেট করা যায়নি।");
        return;
      }

      setName(trimmedName);
      setMessage("আপনার প্রোফাইল সফলভাবে আপডেট হয়েছে।");
      router.refresh();
    } catch {
      setError("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    setSigningOut(true);
    setError("");

    try {
      const { error } = await authClient.signOut();

      if (error) {
        setError(error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      router.replace("/signin");
      router.refresh();
    } catch {
      setError("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <div className="mt-8 space-y-8">
      {/* Profile summary */}
      <section className="flex flex-col gap-5 rounded-3xl border border-line bg-paper p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex min-w-0 items-center gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-stone-100 sm:h-24 sm:w-24">
            {image ? (
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserRound className="h-10 w-10 text-muted" />
            )}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold text-ink sm:text-2xl">
              {name}
            </h2>
            <p className="mt-1 break-all text-base text-muted sm:text-xl">
              {email}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-rise px-5 py-3 font-semibold text-rise transition hover:bg-rise-soft disabled:opacity-60 sm:self-center"
        >
          <LogOut size={19} />
          {signingOut ? "অপেক্ষা করুন..." : "সাইন আউট"}
        </button>
      </section>

      {/* Update profile */}
      <section className="rounded-3xl border border-line bg-paper p-6 sm:p-8">
        <h2 className="text-xl font-bold text-ink">তথ্য</h2>

        <form onSubmit={handleUpdate} className="mt-8 space-y-5 sm:px-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-lg font-medium text-ink"
            >
              নাম
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
              className="h-12 w-full rounded-xl border border-line bg-transparent px-4 text-base text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-rise-soft px-4 py-3 text-sm text-rise"
            >
              {error}
            </p>
          )}

          {message && (
            <p
              role="status"
              className="rounded-lg bg-fall-soft px-4 py-3 text-sm text-fall"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={saving || name.trim() === initialName}
            className="flex h-14 w-full items-center justify-center rounded-xl bg-brand text-lg font-semibold text-white shadow-[0_3px_4px_rgba(21,128,61,0.25)] transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </section>
    </div>
  );
}
