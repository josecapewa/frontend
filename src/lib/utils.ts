import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomImageQuery() {
  return Math.random().toString(36).substring(7);
}

const hexToRGB = (hex: string) => {
  let r = 0,
    g = 0,
    b = 0;

  if (hex.length == 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length == 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }

  return { r, g, b };
};

export const getContrastYIQ = (hex: string) => {
  const { r, g, b } = hexToRGB(hex);

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? "#000000" : "#FFFFFF";
};

export const getAge = (dateString: string): number => {
  const [year, month, day] = dateString.split("-").map(Number);
  const birthDate = new Date(year, month - 1, day);

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const isBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!isBirthdayPassed) {
    age--;
  }

  return age;
};

export const stepsVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

export const checkVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

export function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 70 + Math.random() * 20;
  const lightness = 50 + Math.random() * 10;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export const alphabetOptions = Array.from({ length: 26 }, (_, i) => {
  const letter = String.fromCharCode(65 + i);
  return { value: letter, label: letter };
});

export const pleasantColors = [
  "#EFC050",
  "#BC243C",
  "#45B8AC",
  "#5B5EA6",
  "#FF6F61",
  "#6B5B95",
  "#88B04B",
  "#F7CAC9",
  "#92A8D1",
  "#955251",
  "#B565A7",
  "#009B77",
  "#DD4124",
  "#9B2335",
  "#DFCFBE",
  "#98B4D4",
];

export const isPasswordStrongEnought = (pass: string) => {
  return pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/)
}

//Special Exams Functions

export const getTime = (data: Date) => {
  const horas = data.getHours();
  const minutos = data.getMinutes();

  return `${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}`;
};

export const calcAge = (dataNascimento: Date): number => {
  const hoje = new Date();
  let idade = hoje.getFullYear() - dataNascimento.getFullYear();
  const mes = hoje.getMonth() - dataNascimento.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
    idade--;
  }
  return idade;
};


export const formatSubjectName = (nome: string) => {
  const semEspaco = nome.trimEnd().trimStart();
  const palavras = semEspaco.split(" ");

  const formatadas = palavras.filter((p) => p.length > 2);

  if (formatadas.length > 2) {
    return formatadas
      .map((p, ind) => {
        return `${p[0].toUpperCase()}${
          ind === formatadas.length - 1 ? "" : "."
        }`;
      })
      .join(" ");
  }
  return nome;
};

// const createImage = (url: string): Promise<HTMLImageElement> =>
//   new Promise((resolve, reject) => {
//     const image = new Image();
//     image.src = url;
//     image.crossOrigin = "anonymous";
//     image.onload = () => resolve(image);
//     image.onerror = (error) => reject(error);
//   });

// const getCroppedImg = async (
//   imageSrc: string,
//   cropArea: Area,
//   rotation = 0
// ): Promise<File> => {
//   const image = await createImage(imageSrc);
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");

//   if (!ctx) throw new Error("Context not found");

//   const { width, height } = cropArea;
//   canvas.width = width;
//   canvas.height = height;

//   ctx.translate(width / 2, height / 2);
//   ctx.rotate((rotation * Math.PI) / 180);
//   ctx.drawImage(
//     image,
//     cropArea.x,
//     cropArea.y,
//     cropArea.width,
//     cropArea.height,
//     -width / 2,
//     -height / 2,
//     width,
//     height
//   );

//   const croppedImageBlob = await new Promise<Blob | null>((resolve) => {
//     canvas.toBlob(
//       (blob) => {
//         if (!blob) {
//           throw new Error("Blob generation failed");
//         }
//         resolve(blob);
//       },
//       "image/png",
//       1
//     );
//   });
//   if (!croppedImageBlob) throw new Error("Blob generation failed");

//   const croppedImageFile = new File([croppedImageBlob], "cropped-image.png", {
//     type: "image/png",
//   });

//   return croppedImageFile;
// };

// export default getCroppedImg;
