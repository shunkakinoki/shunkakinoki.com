"use client";

import type { NotionPageObject } from "@/services/notion";
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
    <>
      <h1 className="pb-4 font-bold text-3xl text-text tracking-tight">
        Workout Data
      </h1>
      <Table>
        <TableCaption>
          {/* @ts-ignore */}
          Workout Data for {content.properties.Property.title[0].plain_text}
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
                {key.endsWith("Running") && "km"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
