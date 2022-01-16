import { MenuAlt3Icon } from "@heroicons/react/outline";
import type { FC } from "react";

import { useMobileMenu } from "@/hooks/useMobileMenu";

export const MenuButton: FC = () => {
  const [, setMenuOpen] = useMobileMenu();

  return (
    <button
      type="button"
      className="inline-flex justify-center items-center p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
      onClick={() => {
        return setMenuOpen(isMenuOpen => {
          return !isMenuOpen;
        });
      }}
    >
      <span className="sr-only">Open menu</span>
      <MenuAlt3Icon className="w-6 h-6" />
    </button>
  );
};
