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

import { BaseImage, useBaseImageError } from "@lightdotso/elements/base-image";
import type { BaseImageProps } from "@lightdotso/elements/base-image";
import {} from "react";
import type { FC } from "react";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const CaptionImage: FC<BaseImageProps> = ({ alt, ...props }) => {
  // ---------------------------------------------------------------------------
  // State Hooks
  // ---------------------------------------------------------------------------

  const isImageError = useBaseImageError();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (isImageError) {
    return null;
  }

  return (
    <div className="relative aspect-video">
      <BaseImage
        onErrorHide
        width={1200}
        height={630}
        className="!pt-0"
        alt={alt}
        {...props}
      />
      <div className="absolute bottom-6 left-2 line-clamp-1 rounded-md bg-black bg-opacity-50 p-1 text-white text-xs">
        {alt}
      </div>
    </div>
  );
};