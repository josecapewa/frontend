
export default function CustomNotFoundPage() {
  return (
    <section className="size-full flex justify-center items-center">
      <div className="gap-4 items-center justify-center">
        <img className="max-h-[100vh] max-w-[100vh]" src="/404 error with a landscape-bro.svg" alt="Manutenção" />
        <div className="gap-4 items-center">
          <h1 className="text-4xl font-bold text-[#027D51]">
            Página em manutenção de momento
          </h1>
          <p className="text-center text-lg">
            A página que está a tentar aceder não está disponível de momento.
          </p>
          <p className="text-center text-lg">
            Por favor, tente novamente mais tarde.
          </p>
        </div>
      </div>
    </section>
  );
}
