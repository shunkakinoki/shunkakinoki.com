import clsx from "clsx";
import Image from "next/image";

import { SwitchButton } from "@/common/Button";
import { SectionText } from "@/common/Text";
import ProductCard from "@/components/Product/ProductCard";
import { ProductLinks } from "@/const";

export interface Props {
  isPartial?: boolean;
}

export default function Product({ isPartial = false }: Props): JSX.Element {
  return (
    <section key="product" className={clsx("mb-6 w-full", isPartial && "mt-6")}>
      <div className="px-3 md:px-0">
        <SectionText isPartial={isPartial}>Products</SectionText>
      </div>
      <div className="flex-col items-center px-6 sm:px-4 md:px-0 mt-3 w-full">
        <ul
          className={clsx(
            "grid grid-cols-1 gap-3",
            isPartial && "md:gap-3",
            !isPartial && "md:gap-6",
          )}
        >
          <ProductCard
            description="Sentrei is an all-in-one serverless backend infrastructure of your dreams"
            name="Sentrei"
            href={ProductLinks.sentrei}
          >
            <Image
              layout="intrinsic"
              width={64}
              height={64}
              src="/sentrei.png"
              alt="Sentrei"
              className="inline py-1 pr-2"
            />
          </ProductCard>
        </ul>
      </div>
      <div className="pt-3 my-3 w-full leading-5 text-center">
        <div className="flex justify-center w-full">
          <SwitchButton
            href={isPartial ? "/products" : "/#products"}
            type={isPartial ? "right" : "left"}
          />
        </div>
      </div>
    </section>
  );
}
