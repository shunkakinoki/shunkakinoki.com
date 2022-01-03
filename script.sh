#!/bin/bash

if [ $VERCEL ]; then
  echo "PWD: $PWD"
  echo "VERCEL_ENV: $VERCEL_ENV"
  echo "VERCEL_GIT_COMMIT_MESSAGE: $VERCEL_GIT_COMMIT_MESSAGE"
  echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"
fi

if [[ "$VERCEL_GIT_COMMIT_MESSAGE" =~ "[skip ci]" ]]; then
  echo "🤖 - Bot build cancelled"
  exit 0
else
  APP=$1
fi

# if [[ $VERCEL ]]; then
#   echo "😳 - Removing OG pages for vercel"
#   rm src/pages/api/hello.ts
#   rm src/pages/api/html.ts
#   rm src/pages/api/image.ts
# fi
if [[ "$APP" == "shunkakinoki.com" ]]; then
  echo "🥩 - Removing OG pages"
  rm src/pages/api/hello.ts
  rm src/pages/api/html.ts
  rm src/pages/api/image.ts
  rm src/lib/getScreenshot.ts
fi
if [[ "$APP" == "og.shunkakinoki.com" ]]; then
  echo "👶 - Preserving OG pages"
  rm -r src/pages/api/analytics
  rm -r src/pages/api/auth
  rm -r src/pages/api/likes
  rm -r src/pages/api/views
  rm src/pages/api/subscribe.ts
  rm src/pages/[...slug].tsx
  rm src/pages/_app.tsx
  rm src/pages/_document.tsx
  rm src/pages/_error.tsx
  rm src/pages/404.tsx
  rm src/pages/about.tsx
  rm src/pages/auth.tsx
  rm src/pages/blog.tsx
  rm src/pages/clock.tsx
  rm src/pages/credits.tsx
  rm src/pages/dashboard.tsx
  rm src/pages/history.tsx
  rm src/pages/index.tsx
  rm src/pages/og.tsx
  rm src/pages/products.tsx
  rm src/pages/social.tsx
  rm src/pages/subscribe.tsx
  rm next.config.js
fi

if [[ "$VERCEL_ENV" == "production" ]]; then
  echo "✅ - Build can proceed in production"
  exit 1
elif [[ "$VERCEL_ENV" == "preview" && ( "$APP" == "design" || "$APP" == "shunkakinoki" ) ]]; then
    echo "❎ - Build can proceed in vercel preview at $APP - $CHANGED"
    exit 1
else
  echo "🌼 - Build not proceeding at $APP - $CHANGED"
  exit 0
fi
