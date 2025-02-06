import { MenuOption } from "@/modules/types/MenuOption";
import { FaExchangeAlt } from "react-icons/fa";
import { FaHome, FaChartPie } from "react-icons/fa";

/**
 * Menu principal para navegação geral
 */
export const baseMenuOptions: MenuOption = {
  label: "Painel Principal",
  path: "/painel-principal",
  icon: FaHome,
  children: [
    {
      label: "Inicio",
      path: "/inicio",
      icon: FaChartPie,
    },
    {
      label: "Trocas",
      path: "/trocas",
      icon: FaExchangeAlt,
    }
  ],
};

export const menuOptions: { [index: string]: MenuOption } = {
  "/painel-principal": baseMenuOptions,
};
