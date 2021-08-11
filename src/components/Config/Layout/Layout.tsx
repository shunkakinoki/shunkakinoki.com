/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { ILayout, ILayoutProperty } from "next-og-utils";
import type { FC } from "react";

import { Input } from "@/common/Input";
import { Select } from "@/common/Select";

import { Title } from "@/components/Config/Title";
import { useLayoutConfig } from "@/hooks/useLayoutConfig";

export interface Props {
  layout: ILayout;
}

export const Layout: FC<Props> = ({ layout }) => {
  return (
    <div className="space-y-4">
      {layout.properties.map(p => {
        return <LayoutProperty key={p.name} property={p} />;
      })}
    </div>
  );
};

export const LayoutProperty: FC<{
  property: ILayoutProperty;
}> = ({ property: p }) => {
  const [layoutConfig, setLayoutConfig] = useLayoutConfig();

  return (
    <div className="flex">
      <Title>{p.name}</Title>
      <div className="w-full">
        {p.type === "text" ? (
          <Input
            placeholder={p.placeholder ?? `Value for ${p.name}`}
            value={layoutConfig[p.name] ?? ""}
            onChange={(e): void => {
              return setLayoutConfig({ [p.name]: e.target.value });
            }}
          />
        ) : p.type === "number" ? (
          <Input
            placeholder={p.placeholder ?? `Value for ${p.name}`}
            value={layoutConfig[p.name] ?? ""}
            type="number"
            onChange={(e): void => {
              return setLayoutConfig({ [p.name]: e.target.value });
            }}
          />
        ) : p.type === "select" ? (
          <Select
            options={p.options.map(value => {
              return { value };
            })}
            value={layoutConfig[p.name] ?? ""}
            onChange={(value): void => {
              return setLayoutConfig({ [p.name]: value });
            }}
          />
        ) : null}

        {p.description != null && (
          <span className="text-xs text-gray-400">{p.description}</span>
        )}
      </div>
    </div>
  );
};
