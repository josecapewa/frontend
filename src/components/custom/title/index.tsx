export default function CustomTitle({
  children,
  useCircle = true,
}: {
  children: React.ReactNode;
  useCircle?: boolean;
}) {
  return (
    <h1 className="text-2xl py-2 transition-all 2xl:text-4xl text max-break:text-lg text-black max-break2:text-base font-bold flex items-center gap-2 border-b mb-2">
      {useCircle && (
        <div className="size-2 2xl:size-4 bg-ipilOrange rounded-full"></div>
      )}
      {children}
    </h1>
  );
}
