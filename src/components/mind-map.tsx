// Copyright 2023-2024 Shun Kakinoki.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
  const nonNullTimeProperties = Object.entries(properties).filter(
    ([_, value]) =>
      // @ts-ignore
      value.type === "date" &&
      // @ts-ignore
      value.date !== null &&
      // @ts-ignore
      value.date.start !== null &&
      // @ts-ignore
      value.date.start.includes("T"),
  );
  const checkboxProperties = Object.entries(properties).filter(
    ([_, value]) =>
      // @ts-ignore
      value.type === "checkbox" &&
      // @ts-ignore
      value.checkbox !== null,
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
          {nonNullTimeProperties.map(([key, value]) => (
            <TableRow key={key}>
              <TableCell className="font-medium">{key}</TableCell>
              <TableCell className="text-right">
                {/* @ts-ignore */}
                {new Date(value.date.start).toLocaleTimeString()}
              </TableCell>
            </TableRow>
          ))}
          {checkboxProperties.map(([key, value]) => (
            <TableRow key={key}>
              <TableCell className="font-medium">{key}</TableCell>
              <TableCell className="text-right">
                {/* @ts-ignore */}
                {value.checkbox ? "Yes" : "No"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
