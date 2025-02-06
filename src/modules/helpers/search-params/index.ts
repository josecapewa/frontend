import { NavigateFunction } from "react-router";

type BaseSearchParamsHelpersProps = {
  searchParamsHelpers: {
    searchParams: URLSearchParams;
    navigate: NavigateFunction;
  };
};
type ParamChangeProps = BaseSearchParamsHelpersProps & {
  key: string;
  value: string;
};

/**
 * Atualiza os parâmetros de busca na URL com base na chave e valor fornecidos.
 * Se o valor for "empty", o parâmetro é removido.
 * @param key - Nome do parâmetro na URL.
 * @param value - Valor do parâmetro. Se for "empty", o parâmetro será removido.
 * @param searchParamsHelpers - Contém os parâmetros de busca e a função de navegação.
 */
export const handleParamChange = ({
  key,
  value,
  searchParamsHelpers,
}: ParamChangeProps) => {
  const { searchParams, navigate } = searchParamsHelpers;
  const newParams = new URLSearchParams(searchParams);
  if (value === "empty") {
    newParams.delete(key);
  } else {
    newParams.delete("page");
    newParams.set(key, value);
  }
  const queryString = newParams.toString();
  navigate(`?${queryString}`, { replace: true });
};

export const handleOnSearch = ({
  searchParamsHelpers,
  text,
  prefix,
}: BaseSearchParamsHelpersProps & { text: string; prefix?: string }) => {
  handleParamChange({
    key: prefix ? `${prefix}_filtro` : "filtro",
    value: text.trim() === "" ? "empty" : text,
    searchParamsHelpers: searchParamsHelpers,
  });
};

export const createSearchParamsByObject = (
  obj: Record<string, number | string>
) => {
  return new URLSearchParams(
    Object.entries(obj)
      .filter(
        ([, value]) =>
          value !== undefined && value !== null && !Number.isNaN(value)
      )
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, string>)
  ).toString();
};
