import { menuOptions } from "@/lib/side-bar-options";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { Link, useLocation } from "react-router";

export function NavLinks() {
  const { pathname } = useLocation();

  const selectedMenuOption = useMemo(() => {
    const keys = Object.keys(menuOptions);
    const sortedKeys = keys.sort((a, b) => b.length - a.length);
    const mainPath = sortedKeys.find((key) => pathname.startsWith(key));
    return menuOptions[mainPath!] || menuOptions["/painel-principal"];
  }, [pathname]);

  const menuAnimation = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        key={selectedMenuOption.label}
        className="flex flex-col gap-1 pr-2 py-2 overflow-y-auto custom_scroll overflow-x-hidden text-white transition-all"
        {...menuAnimation}
      >
        {selectedMenuOption?.children && (
          <div>
            {selectedMenuOption.children.map((option, ind) => (
              <Link
                title={option.label}
                key={ind}
                className={clsx(
                  "p-2 px-4 rounded-r-sm font-bold hover:bg-[#d96f3227] hover:rounded-l-none hover:border-l-[8px] box-border hover:border-white flex items-center gap-2 transition-all",
                  {
                    "border-l-[4px] text-white border-[#27AE60] bg-[#27AE60]":
                      pathname.endsWith(option.path),
                    "text-[#CCE5DC]": !pathname.endsWith(option.path),
                  }
                )}
                to={option.path}
              >
                {option.icon && <option.icon className="size-5" />}
                <span>{option.label}</span>
              </Link>
            ))}
          </div>
        )}
      </motion.nav>
    </AnimatePresence>
  );
}
