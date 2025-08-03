#!/bin/bash
# Get current branch
current_branch=$(git rev-parse --abbrev-ref HEAD)

# Block running on 'main'
if [ "$current_branch" = "main" ]; then
  echo "⚠️  You're already on 'main'. This script should be run from a feature branch."
  exit 1
fi

echo "🔍 Checking for changes..."
git status

read -p "📝 Commit message: " msg

git add .
git commit -m "$msg"

echo "✅ Commit done with message '$msg'!"
