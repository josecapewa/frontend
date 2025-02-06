import { IconType } from "react-icons/lib";


export type MenuOption = {
    label: string;
    path: string;
    icon?: IconType;
    children?: MenuOption[]
};
