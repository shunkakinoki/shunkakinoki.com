import { useRecoilState, atom, SetterOrUpdater } from "recoil";

export const mobileMenuAtom = atom<boolean>({
  default: false,
  key: "mobileMenu",
});

export default function useMobileMenu(): [boolean, SetterOrUpdater<boolean>] {
  return useRecoilState(mobileMenuAtom);
}
