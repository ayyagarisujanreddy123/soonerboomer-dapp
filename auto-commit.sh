#!/bin/bash

# Time-based commit message
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

# Stage all changes
git add .

# Commit with a useful message
git commit -m "🔄 Auto-commit: Saved changes at $TIMESTAMP"

# Push to main branch
git push origin main
