import useMobileMenu from "@/hooks/useMobileMenu";
import { Menu } from "@/icons";

export default function MenuButton(): JSX.Element {
  const [, setMenuOpen] = useMobileMenu();

  return (
    <button
      type="button"
      className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
      onClick={() => setMenuOpen((isMenuOpen) => !isMenuOpen)}
    >
      <span className="sr-only">Open menu</span>
      <Menu />
    </button>
  );
}
