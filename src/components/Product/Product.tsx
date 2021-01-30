import clsx from "clsx";
import Image from "next/image";

import { SectionText } from "@/common/Text";
import ProductCard from "@/components/Product/ProductCard";
import { ProductLinks } from "@/const";

interface Props {
  isPartial?: boolean;
}

export default function Product({ isPartial = false }: Props): JSX.Element {
  return (
    <section key="product" className={clsx("w-full mb-6", isPartial && "mt-6")}>
      <div className="px-3 md:px-0">
        <SectionText isPartial={isPartial}>Product</SectionText>
      </div>
      <div className="flex-col items-center w-full px-6 mt-3 sm:px-4 md:px-0">
        <ul
          className={clsx(
            "grid grid-cols-1 gap-3",
            isPartial && "md:gap-3",
            !isPartial && "md:gap-6"
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
    </section>
  );
}
