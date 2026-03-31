#!/bin/bash
# Daily push script - runs at 5:30 PM
# Auto commit & push all changes in luna-affiliate repo

cd /e/luna-affiliate || exit 1

# Check if there are changes
if git diff --quiet && git diff --staged --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  echo "$(date): No changes to push" >> /e/luna-affiliate/.claude/scripts/daily-push.log
  exit 0
fi

# Stage all changes
git add -A

# Commit with timestamp
git commit -m "$(cat <<'EOF'
daily: auto push $(date +%Y-%m-%d %H:%M)

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"

# Push to current branch
git push origin feature/roger

echo "$(date): Push completed successfully" >> /e/luna-affiliate/.claude/scripts/daily-push.log
