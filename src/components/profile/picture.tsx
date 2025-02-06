import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

interface IProfilePictureProps
  extends Omit<
    React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >,
    "src"
  > {
  imageUrl?: string | null;
  name?: string;
}

const ProfilePicture = forwardRef<
  HTMLImageElement | HTMLDivElement,
  IProfilePictureProps
>(({ imageUrl, name, className, ...props }, ref) => {
  const handleOnError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    img.src = "/student-not-found.svg";
  };

  return imageUrl ? (
    <img
      className={cn(
        "size-44 max-w-max aspect-square object-cover border border-ipilOrange rounded-full ",
        className
      )}
      src={imageUrl}
      title={`Foto tipo passe de ${name}`}
      alt={`Foto tipo passe de ${name}`}
      onError={handleOnError}
      ref={ref as React.RefObject<HTMLImageElement>}
      {...props}
    />
  ) : (
    <div
      className={cn(
        "size-44 border aspect-square border-ipilOrange text-center rounded-full flex items-center justify-center font-bold",
        "aspect-square", // Garantir a proporção quadrada
        className
      )}
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      Sem foto
    </div>
  );
});

ProfilePicture.displayName = "ProfilePicture";

export default ProfilePicture;
