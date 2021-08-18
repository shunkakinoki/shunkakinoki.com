#!/bin/bash

echo "PWD: $PWD"
echo "VERCEL_ENV: $VERCEL_ENV"
echo "VERCEL_GIT_COMMIT_MESSAGE: $VERCEL_GIT_COMMIT_MESSAGE"
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_MESSAGE" =~ "[skip ci]" ]]; then
  echo "🤖 - Bot build cancelled"
  exit 0
else
  APP=$1
fi


if [[ "$VERCEL_ENV" == "production" || "$VERCEL_GIT_COMMIT_REF" == "alpha" || "$VERCEL_GIT_COMMIT_REF" == "beta" || "$VERCEL_GIT_COMMIT_REF" == "main" ]]; then
  echo "✅ - Build can proceed in production"
  exit 1
else
  if [[ "$APP" == "og" && $(git diff HEAD^ HEAD --quiet src) -ne 0 ]]; then
    echo "✨ - OG can proceed in preview"
    exit 1
  elif [[ "$APP" == "shunkakinoki" && $(git diff HEAD^ HEAD --quiet locales public src) -ne 0 ]]; then
    echo "🍎 - Shunkakinoki can proceed in preview"
    exit 1
  elif [[ "$APP" == "storybook" && $(git diff HEAD^ HEAD --quiet src/components) -ne 0 ]]; then
    echo "🎨 - Storybook can proceed in preview"
    exit 1
  else
    echo "🌼 - Build not proceeding"
    exit 0
  fi
fi
