export default function ButtonLoading() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin-circle"></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-full animate-expand-contract"></div>
      </div>
    </div>
  );
}
