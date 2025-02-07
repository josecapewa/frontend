import { MenuOption } from "@/modules/types/MenuOption";
import { FaExchangeAlt, FaNetworkWired } from "react-icons/fa";
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
      path: "/painel-principal",
      icon: FaChartPie,
    },
    {
      label: "Benefícios",
      path: "/beneficios",
      icon: FaExchangeAlt,
    },
    {
      label: "Categorias de benefícios",
      path: "/categorias",
      icon: FaNetworkWired,
    }
  ],
};

export const menuOptions: { [index: string]: MenuOption } = {
  "/painel-principal": baseMenuOptions,
};
