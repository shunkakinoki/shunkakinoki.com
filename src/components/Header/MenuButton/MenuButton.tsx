import useMobileMenu from "@/hooks/useMobileMenu";
import { Menu } from "@/icons";

export default function MenuButton(): JSX.Element {
  const [, setMenuOpen] = useMobileMenu();

  return (
    <button
      type="button"
      className="inline-flex justify-center items-center p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-400 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-500 focus:outline-none"
      onClick={() => {
        return setMenuOpen(isMenuOpen => {
          return !isMenuOpen;
        });
      }}
    >
      <span className="sr-only">Open menu</span>
      <Menu />
    </button>
  );
}
