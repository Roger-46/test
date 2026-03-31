---
name: GitBook Affily
description: GitBook API token, org ID, space IDs for Affily documentation
type: reference
---

**API Token:** `gb_api_D9FH5i2PLII2VOqGqmMtCXC1ncy8QOJTeJR4fzu5`
**Account:** Đinh Xuân Hải (haidx@avada.io)
**Org:** Affily (`gW3vBHXaC9Wtb6D95PLW`)

## Spaces

| Space | ID | Git Sync |
|-------|-----|----------|
| Home | `Gm5k1q0zr8xS5ndaHscb` | - |
| Documentation | `542SWgEwy3AZ1T2yxIPT` | GitLab `feature/roger` |
| Help Center | `3T3EVuPhj6HL75aOMEA8` | - |
| API Reference | `ltNSVDx3OHzgsUurcj3D` | - |
| Changelog | `Cjk8HQNRTv99282SaI2m` | - |

## API Usage

```bash
# Auth header
-H "Authorization: Bearer gb_api_D9FH5i2PLII2VOqGqmMtCXC1ncy8QOJTeJR4fzu5"

# Base URL
https://api.gitbook.com/v1

# Key endpoints
GET /orgs/{orgId}/spaces          # List spaces
GET /spaces/{spaceId}/content     # Get space content
POST /spaces/{spaceId}/content    # Create/update pages
```

**How to apply:** Use API to create/update GitBook pages. Documentation space syncs with GitLab branch `feature/roger` in folder `documents/roger/gitbook`.
