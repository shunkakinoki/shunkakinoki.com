"use client";

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
  content: NotionPageObject;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const Checklist: FC<ChecklistProps> = ({ content }) => {
  return (
    <div className="rounded-md border border-border bg-background p-4">
      <Table>
        <TableCaption>
          Checklist for organizing my priorities. More can be found{" "}
          <ExternalLink href="https://shunkakinoki.com/checklist">
            here
          </ExternalLink>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              {/* @ts-ignore */}
              {content.properties.Name?.title[0]?.plain_text}
            </TableCell>
            <TableCell className="text-right">
              <ExternalLink
                // @ts-ignore
                href={content.public_url}
              >
                URL
              </ExternalLink>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
