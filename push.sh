#!/bin/bash

branch=$(git branch --show-current)

echo "🚀 Pushing branch '$branch' to GitHub..."

git push origin "$branch"

echo "✅ Push completed successfully!"
