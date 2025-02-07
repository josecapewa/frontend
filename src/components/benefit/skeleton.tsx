import { Skeleton } from "@/components/ui/skeleton";

export function BenefitSkeleton() {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
      <div className="p-6">
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-6 w-24 rounded-full mb-4" />

        <div className="border-t pt-4">
          <Skeleton className="h-5 w-40 mb-3" />
          <Skeleton className="h-10 w-full rounded-lg mb-3" />
          <Skeleton className="h-10 w-full rounded-lg mb-3" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
