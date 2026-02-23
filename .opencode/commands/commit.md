---
description: Create a git commit following Conventional Commits specification
---

Load the skill "conventional-commits" first, then create a git commit following the Conventional Commits specification.

## Current Changes

**Git Status:**
!`git status`

**Staged Changes:**
!`git diff --cached`

**Unstaged Changes:**
!`git diff`

**Recent Commits (for style reference):**
!`git log --oneline -5`

## Instructions

1. Analyze all staged and unstaged changes
2. Stage relevant files if needed (ask user which files to include if unclear)
3. Draft a commit message following Conventional Commits format:
   - Type: feat, fix, docs, style, refactor, perf, test, build, ci, chore, or revert
   - Optional scope in parentheses
   - Imperative mood description (lowercase, no period)
   - Optional body and footer for breaking changes
4. **Show the drafted commit message to the user for review and confirmation**
5. **Wait for user approval before creating the commit**
6. Create the commit only after user confirms

If there are no changes to commit, inform the user.
