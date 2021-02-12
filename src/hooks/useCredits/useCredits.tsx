import { useRecoilState, atom, SetterOrUpdater } from "recoil";

export const creditsAtom = atom<boolean>({
  default: false,
  key: "credits",
});

export default function useCredits(): [boolean, SetterOrUpdater<boolean>] {
  const [isCreditsOpen, setCreditsOpen] = useRecoilState(creditsAtom);

  return [isCreditsOpen, setCreditsOpen];
}
