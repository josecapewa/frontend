import { useRef, useEffect } from "react";

/**
 * Custom Hook: useDebounce
 *
 * Esse hook permite a criação de uma função "debounced", ou seja, uma função que será executada
 * apenas após um determinado intervalo de tempo (delay) desde a última vez que foi chamada.
 * Isso é útil para otimizar execuções repetidas, como chamadas de API durante a digitação
 * em campos de busca ou eventos de redimensionamento da janela.
 *
 * @template T - Tipo da função de callback.
 * @param {T} callback - A função que será chamada após o atraso configurado.
 * @param {number} delay - O tempo de atraso (em milissegundos) antes de executar o callback.
 * @returns {(...args: Parameters<T>) => void} - Uma função debounced que pode ser usada no lugar da função original.
 */
export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  // Ref para armazenar o identificador do timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // A função "debounced" que será retornada pelo hook.
  const debouncedFunction = (...args: Parameters<T>): void => {
    // Limpa o timer existente, se houver, para evitar múltiplas execuções do callback
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Agenda um novo timer para executar o callback após o atraso definido
    timerRef.current = setTimeout(() => {
      callback(...args); // Executa o callback com os argumentos fornecidos
    }, delay);
  };

  // useEffect é usado para limpar o timer quando o componente que usa o hook for desmontado
  useEffect(() => {
    return () => {
      // Cleanup: Limpa o timer ativo ao desmontar o componente
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []); // O array vazio indica que isso será executado apenas no unmount

  // Retorna a função debounced, que pode ser usada no lugar da função original
  return debouncedFunction;
}
