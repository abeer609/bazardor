import { Suspense } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { ProfileSkeleton } from "@/app/components/Skeletons";
import ProfileForm from "../components/ProfileForm";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">
          আমার প্রোফাইল
        </h1>
        <p className="mt-1 text-base text-muted sm:text-lg">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>

        <Suspense fallback={<ProfileSkeleton />}>
          <ProfileContent />
        </Suspense>
      </div>
    </main>
  );
}

async function ProfileContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    redirect("/signin?reason=protected&callbackURL=/profile/update");

  return (
    <ProfileForm
      name={session.user.name}
      email={session.user.email}
      image={session.user.image}
    />
  );
}
