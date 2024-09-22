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

export type ChecklistProps = {
  contents: NotionPageObject[];
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const Checklist: FC<ChecklistProps> = ({ contents }) => {
  return (
    <div className="rounded-md border border-border bg-background p-4">
      <Table>
        <TableCaption>
          Checklist for organizing my priorities. Full list can be found{" "}
          <ExternalLink href={InternalConfig.Checklist}>here</ExternalLink>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contents.map((content) => (
            <TableRow key={content.id}>
              <TableCell>
                {/* @ts-ignore */}
                {content.properties.Name?.title[0]?.plain_text}
              </TableCell>
              <TableCell className="text-right">
                <ExternalLink
                  className="w-12"
                  // @ts-ignore
                  href={content.public_url}
                >
                  URL
                </ExternalLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
