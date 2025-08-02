#!/bin/bash

echo "🔍 Checking for changes..."
git status

read -p "📝 Commit message: " msg

git add .
git commit -m "$msg"

echo "✅ Commit done with message '$msg'!"
