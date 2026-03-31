#!/bin/bash
# StorLeads API helper for app research
# Usage: ./storeleads-research.sh <query> [limit]
# Example: ./storeleads-research.sh "loyalty program" 20

QUERY="${1:?Usage: storeleads-research.sh <query> [limit]}"
LIMIT="${2:-20}"

# StorLeads API - check TOOLS.md for credentials
echo "⚠️  StorLeads API key needed. Check TOOLS.md or ask Sam."
echo "Query: $QUERY"
echo "Limit: $LIMIT"
echo ""
echo "Manual research alternatives:"
echo "1. web_search: site:apps.shopify.com $QUERY"
echo "2. web_fetch: https://apps.shopify.com/search?q=$QUERY"
