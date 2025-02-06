export default function AppLoading() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-4">
      {/* Círculo animado */}
      <div className="relative">
        <div className="w-20 h-20 border-4 border-t-transparent border-[#027D51] rounded-full animate-spin-circle"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="size-14 bg-[#027D51] rounded-full animate-expand-contract"></div>
        </div>
      </div>

      {/* Texto de carregamento */}
      <div className="text-lg font-bold text-gray-700 animate-blink">
        Carregando...
      </div>
    </div>
  );
}
