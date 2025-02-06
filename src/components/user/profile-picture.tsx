import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import React, { forwardRef, useState } from "react";

interface UserIProfilePictureProps
  extends Omit<
    React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >,
    "src"
  > {
  imageUrl?: string | null;
  name?: string;
  onImageChange?: (file: File | null) => void;
}

const UserProfilePicture = forwardRef<
  HTMLImageElement | HTMLDivElement,
  UserIProfilePictureProps
>(({ imageUrl, name, className, onImageChange, ...props }, ref) => {
  const [preview, setPreview] = useState<string | null>(imageUrl || null);

  const handleOnError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    img.src = "/student-not-found.svg";
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      if (onImageChange) onImageChange(file);
    } else {
      setPreview(null);
      if (onImageChange) onImageChange(null);
    }
  };

  return (
    <div className="relative">
      {preview ? (
        <img
          className={cn(
            "2xl:size-44 aspect-square size-32 max-w-max object-cover border border-ipilOrange rounded-full",
            className
          )}
          src={preview}
          title={`Foto tipo passe de ${name}`}
          alt={`Foto tipo passe de ${name}`}
          onError={handleOnError}
          ref={ref as React.RefObject<HTMLImageElement>}
          {...props}
        />
      ) : (
        <div
          className={cn(
            "2xl:size-44 size-32 border border-ipilOrange text-center rounded-full flex items-center justify-center font-bold",
            "aspect-square", // Garantir a proporção quadrada
            className
          )}
          ref={ref as React.RefObject<HTMLDivElement>}
        >
          Sem foto
        </div>
      )}

      <label
        htmlFor="profile-picture-input"
        className="absolute hover:bg-[#00000083] text-lg md:text-xl 2xl:text-2xl  opacity-0 hover:opacity-100 hover:text-white rounded-full transition-all top-0 left-0 size-full flex flex-col gap-2 font-semibold justify-center items-center cursor-pointer"
      >
        <Pencil className="size-8 2xl:size-10" />
        Editar
        <input
          id="profile-picture-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
});

UserProfilePicture.displayName = "UserProfilePicture";

export default UserProfilePicture;
