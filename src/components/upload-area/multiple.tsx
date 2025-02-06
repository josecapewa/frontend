import { BsFiletypeXlsx } from "react-icons/bs";
import { useState, useCallback, useEffect } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { FaFileCsv, FaFileImage, FaFilePdf } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import CustomToolTip from "../custom/tooltip";

type MultipleUploadAreaProps
 = {
  acceptedFiles?: AcceptedFiles[];
  hideText?: boolean;
  onChange: (files: File[]) => void;
  onClear: () => void;
  onDelete?: (index: number) => void;
}
export default function MultipleUploadArea({
  acceptedFiles,
  hideText = false,
  onChange,
  onClear,
  onDelete,
}: MultipleUploadAreaProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newPreviews = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setFiles((prev) => [...prev, ...acceptedFiles]);
      setPreviews((prev) => [...prev, ...newPreviews]);
      onChange([...files, ...acceptedFiles]);
    },
    [files, onChange]
  );

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: acceptedFiles?.reduce<Accept>(
        (acc, type) => ({ ...acc, [type]: [] }),
        {}
      ),
      multiple: true,
    });

  const clearFiles = () => {
    setFiles([]);
    setPreviews([]);
    onClear();
  };

  const deleteFile = (fileName: string) => {
    const index = files.findIndex((file) => file.name === fileName);
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
    onDelete?.(index);
  };

  return (
    <div
      {...getRootProps()}
      className={`border-dashed flex p-2 flex-col relative justify-center items-center border-2 rounded-lg cursor-pointer min-w-[340px] min-h-[150px] ${
        isDragActive
          ? isDragReject
            ? " border-red-500"
            : "border-ipilOrange"
          : "border-gray-300"
      }`}
    >
      <CustomToolTip text="Remover todos">
        <Button
          disabled={files.length === 0}
          onClick={(e) => {
            e.stopPropagation();
            clearFiles();
          }}
          className="text-sm absolute top-0 2xl:size-min p-1 size-min right-0"
        >
          <X />
        </Button>
      </CustomToolTip>
      {isDragActive && (
        <div
          className={cn(
            "absolute top-0 left-0 h-full w-full bg-[#d96f329f] transition-all rounded-lg",
            {
              "bg-red-500/20": isDragReject,
            }
          )}
        ></div>
      )}
      <input {...getInputProps()} />
      {!hideText && (
        <div className="text-center text-sm">
          {isDragActive ? (
            <p className="text-blue-500">
              {isDragReject ? (
                <>Ficheiros no formato errado</>
              ) : (
                <>Solte os arquivos aqui...</>
              )}
            </p>
          ) : (
            <p>
              Arraste e solte arquivos ou clique para{" "}
              {files.length > 0 ? "adicionar mais" : "selecionar"}
            </p>
          )}
        </div>
      )}
      <div className="p-2 flex flex-wrap items-cente rounded-md justify-center gap-4 overflowy-y-scroll overflow-x-hidden">
        {files.map((file, index) => (
          <div
            key={index}
            className="relative select-none flex flex-col items-center"
          >
            {file.type.startsWith("image/") ? (
              <div
                className="w-14 h-14 rounded-md bg-cover bg-no-repeat overflow-hidden"
                style={{ backgroundImage: `url(${previews[index]})` }}
              >
                <CustomToolTip text="Remover arquivo">
                  <Button
                    disabled={files.length === 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFile(file.name);
                    }}
                    className="text-sm absolute -top-2 2xl:size-min p-[2px] size-min -right-2"
                  >
                    <X size={15} />
                  </Button>
                </CustomToolTip>
              </div>
            ) : (
              icons[file.type as AcceptedFiles] || <p>Arquivo não suportado</p>
            )}
            <p className="text-xs text-center mt-1 line-clamp-1 max-w-14">
              {file.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const icons: Record<AcceptedFiles, React.ReactNode> = {
  "application/pdf": <FaFilePdf size={30} />,
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": (
    <BsFiletypeXlsx size={30} />
  ),
  "application/csv": <FaFileCsv size={30} />,
  "image/jpeg": <FaFileImage size={30} />,
  "image/png": <FaFileImage size={30} />,
  "image/gif": <FaFileImage size={30} />,
  "image/svg+xml": <FaFileImage size={30} />,
  "image/jpg": <FaFileImage size={30} />,
};
