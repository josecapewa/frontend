import { useMemo } from "react";

type StudentCardPreviewProps = {
  cardModel?: CardModel;
  studentInClass?: StudentInClassCard;
};
export default function StudentCardPreview({
  studentInClass: student,
  cardModel,
}: StudentCardPreviewProps) {
  const handleOnError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    img.src = "/student-not-found.svg";
  };
  const studentImage = useMemo(() => {
    return student?.aluno.pessoa.foto
      ? `${import.meta.env.VITE_IMAGES_DIR}/${student.aluno.pessoa.foto}`
      : undefined;
  }, [student]);

  const course = useMemo(() => {
    return student?.turma.nome_turma.curso;
  }, [student]);

  const room = useMemo(() => {
    return student?.turma.sala;
  }, [student]);

  return (
    <div className="relative min-w-[321.25984252px] min-h-[204.09448819px] text-[10px] [line-height:1.2]">
      {cardModel ? (
        <>
          <section className="absolute top-5 left-5 flex gap-2 items-start">
            <img
              className="size-[54.995905512px] select-none"
              src="/ipil_icon.png"
            />
            <div className="max-w-[115px] z-10 ">
              <InfoRow
                label="ÁREA DE FORMAÇÃO"
                value={cardModel?.area_formacao.nome}
              />
              <InfoRow label="CURSO" value={course?.nome.toUpperCase()} />
            </div>
          </section>
          <img
            src={`${import.meta.env.VITE_IMAGES_DIR}/${cardModel?.foto_frente}`}
            alt={`Modelo de frente de ${cardModel?.area_formacao.nome}`}
            className="w-[321.25984252px] h-[204.09448819px] border select-none"
          />
          <p className="absolute top-[60%] left-5 font-bold text-[15px]">{`${
            student?.n_turma || "N/A"
          } - ${student?.turma.nome_turma.designacao || "N/A"}`}</p>
          <div className="absolute top-5 right-1 max-w-[111px] w-full z-10 ">
            <InfoRow label="NOME" value={student?.aluno.pessoa.nome} />
            <InfoRow
              label="SALA"
              value={
                room ? `${room.designacao} - ${room.sector.nome}` : undefined
              }
            />
            <InfoRow label="nº proc" value={student?.aluno.n_processo} />
          </div>
          {studentImage ? (
            <img
              className="size-[80px] select-none border -z-10 absolute bottom-4 left-1/2 -translate-x-[52%]"
              src={studentImage}
              onError={handleOnError}
              title={`Foto tipo passe de ${student?.aluno.pessoa.nome}`}
              alt={`Foto de ${student?.aluno.pessoa.nome}`}
            />
          ) : (
            <div className="size-[80px] select-none border flex items-center justify-center font-bold text-base -z-10 absolute bottom-4 left-1/2 -translate-x-[52%]">
              N/A
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center text-base justify-center size-full">
          Seleccione um modelo de cartão
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { value?: string; label?: string }) {
  return (
    <p>
      <span className="font-bold">{label?.toLocaleUpperCase() || "N/A"}: </span>{" "}
      <span>{value?.toUpperCase() || "N/A"}</span>
    </p>
  );
}
