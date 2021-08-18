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
