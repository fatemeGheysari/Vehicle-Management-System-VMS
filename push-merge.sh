#!/bin/bash

# ----------------------------
# push-merge.sh
#This script automates the process of pushing a feature branch to origin,
# merging it into the main branch, and cleaning up the feature branch.
# ----------------------------

# ----------------------------
# 🌟 Fancy Git Push-Merge Script
# ----------------------------

# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
NC='\033[0m' # No Color

print_section() {
  echo -e "\n${CYAN}🔷 ${BOLD}$1${NC}"
  echo "----------------------------------------"
}

print_success() {
  echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
  echo -e "${RED}❌ $1${NC}"
}

# Get current branch
current_branch=$(git rev-parse --abbrev-ref HEAD)

if [ "$current_branch" = "main" ]; then
  print_warning "You're already on 'main'. This script should be run from a feature branch."
  exit 1
fi

# Check for uncommitted changes
if ! git diff --quiet || ! git diff --cached --quiet; then
  print_warning "You have uncommitted changes."
  read -p "❓ Continue anyway? (y/n): " proceed
  if [ "$proceed" != "y" ] && [ "$proceed" != "Y" ]; then
    print_error "Aborted by user."
    exit 1
  fi
fi

# Step 1: Push feature branch
print_section "Pushing '$current_branch' to origin..."
git push origin "$current_branch" || { print_error "Push failed."; exit 1; }
print_success "Feature branch pushed."

# Step 2: Switch to main
print_section "Switching to 'main' and pulling latest changes..."
git checkout main || exit 1
git pull origin main || exit 1
print_success "Main branch is up to date."

# Step 3: Merge
print_section "Merging '$current_branch' into 'main'..."
git merge "$current_branch" || { print_error "Merge conflict! Resolve manually."; exit 1; }
print_success "Merge completed."

# Step 4: Push main
print_section "Pushing 'main' to origin..."
git push origin main || exit 1
print_success "Main branch pushed."

# Step 5: Delete feature branch?
print_section "Cleanup"
read -p "🗑 Delete feature branch '$current_branch'? (y/n): " confirm
if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
  git branch -d "$current_branch"
  git push origin --delete "$current_branch" 2>/dev/null || print_warning "Remote branch may already be deleted."
  print_success "Feature branch deleted."
else
  print_warning "Feature branch kept."
fi

# Step 6: Summary log
print_section "Git Log Summary"
git log --oneline --graph --decorate -n 5

echo -e "\n${BOLD}🎉 Done! Your code is merged and clean.${NC}"