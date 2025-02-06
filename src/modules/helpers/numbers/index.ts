export function formatInKwanza(valor?: number): string {
  const formatador = new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatador.format(valor || 0);
}
