import { Transition } from "@headlessui/react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

import useCredits from "@/hooks/useCredits";

export default function CreditsTrailer(): JSX.Element {
  const [isCreditsOpen] = useCredits();
  const { t } = useTranslation();

  return (
    <Transition
      show={isCreditsOpen}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex flex-col items-center justify-center max-w-3xl py-4 mx-auto">
        <Link href="/credits">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="flex items-center">
            <span className="flex-shrink-0 text-base text-center text-pink-300 underline hover:text-pink-200">
              Thank you to everyone who has been with me as part of the journey
            </span>
          </a>
        </Link>
      </div>
    </Transition>
  );
}
