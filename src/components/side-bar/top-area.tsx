import { Link } from "react-router";

export default function TopArea({
  link = "/painel-principal",
}: {
  link?: string;
}) {
  return (
    <Link
      to={link}
      className="flex gap-2 py-2 mx-auto h-full cursor-pointer justify-center items-center"
    >
      <img
        title="Logo do Tuassakidila"
        className="bg-white rounded-full max-w-[50px] max-h-[50px] w-full h-full ml-2 object-cover"
        alt="Logo"
        src="/logo-tuassakidila.png"
      />
      <div className="grid text-left text-sm leading-tight">
        <span className="truncate text- font-semibold text-ellipsis overflow-hidden text-2xl transition-all line-clamp-1 text-white">
          Tuassakidila
        </span>
      </div>
    </Link>
  );
}
