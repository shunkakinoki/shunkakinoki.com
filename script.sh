#!/bin/bash

if [ "$VERCEL" = false ]; then
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

if [ "$GITHUB_ACTIONS" = true ]; then
  if [[ "$APP" == "shunkakinoki.com" ]]; then
    echo "😳 - Removing OG pages"
    rm src/pages/api/hello.ts
    rm src/pages/api/html.ts
    rm src/pages/api/image.ts
  fi
  if [[ "$APP" == "og.shunkakinoki.com" ]]; then
    echo "👶 - Preserving OG pages"
    rm src/pages/api/analytics
    rm src/pages/api/auth
    rm src/pages/api/likes
    rm src/pages/api/views
    rm src/pages/api/subscribe.ts
    rm src/pages/[...slug].tsx
    rm src/pages/about.tsx
    rm src/pages/auth.tsx
    rm src/pages/blog.tsx
    rm src/pages/credits.tsx
    rm src/pages/dashboard.tsx
    rm src/pages/history.tsx
    rm src/pages/index.tsx
    rm src/pages/products.tsx
    rm src/pages/social.tsx
    rm src/pages/subscribe.tsx
    mv src/pages/og.tsx src/pages/index.tsx
  fi
fi

if [ "$VERCEL" = false ]; then
  if [[ "$VERCEL_ENV" == "production" ]]; then
    echo "✅ - Build can proceed in production"
    exit 1
  else
    if [[ "$VERCEL_ENV" == "preview" ]]; then
      echo "❎ - Build can proceed in preview at $APP"
      exit 1
    else
      echo "🌼 - Build not proceeding"
      exit 0
    fi
  fi
fi
