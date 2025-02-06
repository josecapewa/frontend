import dayjs from "dayjs";
export function getFormatedDate() {
  return dayjs().format("dd, DD [de] MMMM - HH:mm:ss");
}
export const capitalizeMonth = (date: Date) => {
  const formatted = dayjs(date).format("D [de] MMMM [de] YYYY");
  const month = dayjs(date).format("MMMM");
  return formatted.replace(month, month[0].toUpperCase() + month.slice(1));
};
