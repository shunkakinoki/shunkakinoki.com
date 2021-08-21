import type { FC } from "react";

import { ErrorText } from "@/common/Text";
import { Seo } from "@/components/Seo";

export const ErrorScreen: FC = () => {
  return (
    <>
      <Seo />
      <div className="flex flex-col justify-center items-center my-16 md:my-24 lg:my-32 mx-auto max-w-3xl">
        <ErrorText>Error</ErrorText>
      </div>
    </>
  );
};
