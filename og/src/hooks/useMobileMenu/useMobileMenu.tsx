import { useRouter } from "next/router";
import { useEffect } from "react";
import type { SetterOrUpdater } from "recoil";
import { useRecoilState, atom } from "recoil";

export const mobileMenuAtom = atom<boolean>({
  default: false,
  key: "mobileMenu",
});

export const useMobileMenu = (): [boolean, SetterOrUpdater<boolean>] => {
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = useRecoilState(mobileMenuAtom);

  useEffect(() => {
    const handleRouteChange = () => {
      setMenuOpen(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events, setMenuOpen]);

  return [isMenuOpen, setMenuOpen];
};
