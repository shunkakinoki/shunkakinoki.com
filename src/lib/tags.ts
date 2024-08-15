import { tagConfig } from "@/config/tag";

export function findTagIdsByName(tagNames: string[]) {
  return tagConfig
    .filter((tag) => tagNames.includes(tag.name))
    .map((tag) => tag.id);
}
