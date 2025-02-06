import { useEffect } from "react";

export function useImagesBuster(query: string) {
  useEffect(() => {
    const images = document.querySelectorAll("img");
    images.forEach((image) => {
      const src = image.getAttribute("src");
      if (src) {
        const [baseUrl, existingQuery] = src.split("?");
        const newSrc = existingQuery
          ? `${baseUrl}?${query}`
          : `${src}?${query}`;

        image.setAttribute("src", newSrc);
      }
    });
  }, [query]);
}
