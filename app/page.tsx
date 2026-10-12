import { Suspense } from "react";
import Hero from "@/app/components/Hero";
import ProductSections from "./components/ProductSections";
import { SectionsSkeleton } from "./components/Skeletons";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<SectionsSkeleton />}>
        <ProductSections />
      </Suspense>
    </>
  );
}
