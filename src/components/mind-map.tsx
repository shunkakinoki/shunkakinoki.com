"use client";

import { InternalConfig } from "@/config/internal";
import type { NotionPageObject } from "@/services/notion";
import { ExternalLink } from "@lightdotso/elements/external-link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@lightdotso/ui/components/table";
import type { FC } from "react";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export type MindMapProps = {
  content: NotionPageObject;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const MindMap: FC<MindMapProps> = ({ content }) => {
  // @ts-ignore
  const properties = content.properties;
  const nonNullNumberProperties = Object.entries(properties).filter(
    // @ts-ignore
    ([_, value]) => value.type === "number" && value.number !== null,
  );

  return (
    <div className="rounded-md border border-border bg-background p-4">
      <Table>
        <TableCaption>
          {/* @ts-ignore */}
          Workout Data for {content.properties.Property.title[0].plain_text}.
          More <ExternalLink href={InternalConfig.Gym}>here</ExternalLink>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Metric</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {nonNullNumberProperties.map(([key, value]) => (
            <TableRow key={key}>
              <TableCell className="font-medium">{key}</TableCell>
              <TableCell className="text-right">
                {(value as { number: number }).number.toLocaleString()}{" "}
                {/* Add suffix based on the property name */}
                {(key === "Deadlift" ||
                  key === "Bench Press" ||
                  key === "Squat" ||
                  key === "Total Lifted") &&
                  "lbs"}
                {(key === "Running" ||
                  key === "Biking" ||
                  key === "Swimming") &&
                  "km"}
                {key === "Body Weight" && "lbs"}
                {key === "Calories" && "kcal"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
