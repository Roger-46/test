---
name: research-new-app
description: Research, analyze, and create PRD for a new Shopify app. Use when Sam says to research a new app, build a new Shopify app, create PRD, or analyze a Shopify app niche. Triggers on phrases like "research new app", "build new app", "PRD", "new Shopify app", "app research".
---

# Research New Shopify App

End-to-end workflow: from market research to production-ready PRD with code checklist.

## Usage

```
research-new-app APP_NAME
```

Example: `research-new-app loyalty-program`

## Variables

Collect from user before starting:
- **APP_NAME** — kebab-case app name (e.g. `loyalty-program`)
- **BRAND** — brand name to prefix (default: "Avada")
- **NICHE** — app category/niche description

If user only provides app name, infer brand as "Avada" and niche from app name.

## Output Structure

```
{{APP_NAME}}/
├── app/                        # Cloned from app-base-template (optional)
│   ├── CLAUDE.md               # Tech stack & conventions (READ THIS FIRST)
│   ├── packages/               # Backend + Frontend + Scripttag
│   ├── extensions/             # Shopify extensions
│   └── ...
└── research/
    │
    │ ── Step 1: Foundation ──
    ├── 01-market-pain-points.md    # Market overview + pain points (combined)
    ├── 02-feature-matrix.md        # Features, priorities, comparison
    ├── 03-target-audience.md       # Segments, personas, sizing
    ├── 04-opportunity-scoring.md   # Go/No-Go, scoring, projections
    │
    │ ── Step 2: Competitors ──
    ├── 05-competitor-analysis.md   # Deep dive 10-15 competitors
    ├── 06-competitor-pricing.md    # Pricing tiers, WTP signals
    ├── 07-aso-keywords.md          # Keywords, listing strategy
    │
    │ ── Step 3: Design ──
    ├── 08-diagrams.md              # Mermaid diagrams (architecture, flows, ERD)
    │
    │ ── Step 4: PRD ──
    ├── 09-prd.md                   # Master PRD (references all above)
    ├── 10-mockups.md               # Screen descriptions + wireframes
    │
    │ ── Step 5: Implementation ──
    ├── 11-user-stories-testcases.md  # Stories + test cases
    ├── 12-architecture.md          # Technical architecture detail
    └── 13-checklist.md             # File-level dev tasks by phase
```

## Workflow — SEQUENTIAL Execution

⚠️ **CRITICAL: Run steps SEQUENTIALLY, not in parallel.**
Each step depends on the output of previous steps. Later steps MUST receive the full context/data from earlier steps.

### Execution Order

```
Step 1: Foundation Research (market + pain points + features + audience)
    ↓ output feeds into
Step 2: Competitor Analysis (uses pain points to evaluate who solves what)
    ↓ output feeds into
Step 3: Diagrams (architecture, flows, ERD — based on features + competitors)
    ↓ output feeds into
Step 4: PRD + Mockups (synthesizes all research + diagrams)
    ↓ output feeds into
Step 5: User Stories + Test Cases (based on PRD features + diagrams)
```

### How to Pass Context Between Steps

When spawning each step as a sub-agent:
1. **Read all output files** from previous steps
2. **Include key findings as context** in the spawn task prompt
3. Each step's agent must reference specific data from previous steps (quotes, numbers, features)
4. Never assume — always pass the actual research data forward

### Phase A: Foundation Research

**Step 1 — Foundation (single spawn, writes 4 files)**

Use `sessions_spawn` with one agent that writes ALL 4 files sequentially:

→ `01-market-pain-points.md` (Market Overview + Pain Points combined)
- Niche overview, market trends, growth trajectory
- TAM / SAM / SOM estimation (use Shopify total store count ~4.6M)
- **Pain points are MOST IMPORTANT** — mine REAL merchant complaints:
  - Reddit r/shopify, r/ecommerce threads
  - Shopify Community forums
  - 1-2 star reviews of top competitors on Shopify App Store
  - Include ACTUAL merchant quotes with source URLs
- For each pain point: Severity (1-5), Frequency, Existing solutions, Gap size
- Whitespace opportunities (Tier 1: massive gap / Tier 2: expensive solutions / Tier 3: niche)

→ `02-feature-matrix.md`
- Full feature list with priority (P0/P1/P2), complexity, target segment
- Feature comparison: our app vs Shopify Native vs top competitors
- Table-stakes vs differentiator classification
- Blue ocean features (what NO competitor has)

→ `03-target-audience.md`
- Segment definitions: Free/Dev, SMB (core), Mid-market, Shopify Plus
- Detailed persona per segment (name, store size, revenue, order volume, team size, pain, budget)
- Segment sizing with estimates
- Key buying triggers per segment
- Primary vs Secondary target recommendation with justification

→ `04-opportunity-scoring.md`
- Score each feature by: Market demand, Competition gap, Technical feasibility, Revenue potential, Time to market
- Go/No-Go assessment with confidence level
- Key risks and mitigations
- Financial projections (Year 1-3)

**Step 2 — Competitor Analysis (depends on Step 1)**

Read Step 1 files first, then spawn agent with full context:

→ `05-competitor-analysis.md`
- Top 10-15 competitors: name, rating, review count, install estimates, pricing
- For each: features, strengths, weaknesses (mine 1-2 star reviews)
- How our app differentiates vs each competitor
- Threat level per competitor (High/Medium/Low)
- Cross-competitor complaint patterns
- Competitive positioning map
- "How We Win" strategy per competitor

→ `06-competitor-pricing.md`
- Detailed pricing tiers for each competitor
- Feature-per-tier comparison
- Willingness-to-pay signals from reviews
- Recommended pricing strategy based on gaps

→ `07-aso-keywords.md`
- Keyword research for Shopify App Store
- Competitor listing analysis (title patterns, description keywords)
- Suggested app name, subtitle, keywords
- Launch plan: review seeding, initial visibility

### Phase B: Technical Design

**Step 3 — Diagrams (depends on Steps 1-2)**

Read all Step 1-2 files, then spawn agent:

→ `08-diagrams.md`
- System Architecture diagram (Mermaid)
- Order/Entity Lifecycle State Machine
- Data Flow diagrams
- User Flow diagrams (onboarding, main workflows)
- Entity Relationship Diagram (database schema)
- Deployment Architecture (GCP/Firebase topology)
- Use ```mermaid code blocks for all diagrams

### Phase C: PRD & Mockups

**Step 4 — PRD + Mockups (depends on Steps 1-3)**

Read ALL previous files, then spawn agent:

→ `09-prd.md` (MASTER document)
- Executive Summary
- Problem Statement (with real merchant quotes from Step 1)
- Solution description
- Target Audience (from Step 1 personas)
- Core Features by phase (P0 MVP, P1 MMP, P2 Growth)
- Pricing Strategy (informed by Step 2 competitor pricing)
- Success Metrics/KPIs by phase
- Competitive Positioning (from Step 2)
- Risks & Mitigations
- Technical Architecture Summary (reference Step 3 diagrams)
- Phases & Timeline
- See `references/prd-template.md` for structure template

→ `10-mockups.md`
- Screen descriptions with wireframes/layouts
- Key interactions per screen
- Polaris components used
- Mobile adaptation notes
- Both merchant admin views AND customer-facing views

### Phase D: User Stories & Implementation

**Step 5 — User Stories + Test Cases + Checklist (depends on Steps 1-4)**

Read ALL previous files (especially PRD + Diagrams), then spawn agent:

→ `11-user-stories-testcases.md`
- User stories per feature with acceptance criteria (Given/When/Then)
- Test cases per feature (happy path + edge cases + error handling + performance)
- Roles: Store Owner, Fulfillment Manager, CS Agent, Team Member, Customer
- Cross-cutting test cases: performance, integrations, mobile, security

→ `12-architecture.md`
- Tech stack details aligned with app/CLAUDE.md (if available)
- Firestore schema, BigQuery data model
- API endpoints, Shopify webhooks
- Infrastructure cost estimates
- Component tree for frontend

→ `13-checklist.md`
- File-level implementation tasks ordered by dependency
- Granular enough for AI to code each item
- Grouped by phase (MVP → MMP → Growth)

### Phase E: Setup App Template (Optional)

If building the app (not just research):

1. **Clone template** into `{{APP_NAME}}/app/`:
   ```bash
   cd {{APP_NAME}}
   git clone git@gitlab.com:avada/app-base-template.git app
   rm -rf app/.git
   ```
2. **Read `app/CLAUDE.md`** — tech stack, project structure, conventions
3. Architecture docs must align with CLAUDE.md patterns

## Pricing Strategy Guidelines

Always apply these defaults unless user overrides:
- **Non-profit / Development stores** → Free
- **SMB** → Core target, competitive pricing, emphasize value
- **Mid-market** → Standard tier, more features
- **Shopify Plus** → Premium tier, significantly higher price (2-5x mid-market)
- Include: 7-14 day free trial, annual discount (15-20%), usage-based options if applicable

## Tech Stack (Avada Standard)

```
Backend:          Node.js, Firebase Functions, Firestore
Frontend:         React, Shopify Polaris v12+
APIs:             Shopify GraphQL Admin API, Shopify REST API
Analytics:        BigQuery
Version Control:  GitLab
Extensions:       Checkout UI, Customer Account, Theme App Extensions
```

### Project Structure

```
packages/
├── functions/src/              # Backend (Firebase Functions)
│   ├── handlers/               #   Controllers - orchestrate ONLY
│   ├── services/               #   Business logic
│   ├── repositories/           #   ONE collection per repo
│   ├── helpers/                #   Utilities
│   └── presenters/             #   Output formatting
├── assets/src/                 # Frontend (React/Polaris)
│   ├── components/             #   Reusable components
│   ├── pages/                  #   Page components
│   └── hooks/                  #   Custom hooks
└── scripttag/src/              # Storefront widget (Preact, lightweight)

extensions/
└── theme-extension/            # Theme App Extension (Liquid blocks)

firestore-indexes/              # Compound query indexes (run yarn firestore:build)
```

All new apps MUST follow this structure. Architecture docs should reference this layout.

## Data Sources

- **StorLeads API** — install counts, revenue estimates, store data. Check TOOLS.md for API key
- **Shopify App Store** — reviews, ratings, pricing pages (web_fetch)
- **Shopify Community** — merchant discussions (web_search + web_fetch)
- **Reddit** — r/shopify, r/ecommerce (web_search)

## Spawn Strategy — SEQUENTIAL (Not Parallel)

⚠️ **Each step is ONE spawn. Wait for completion before spawning the next.**
Results are interconnected — later steps need earlier data as input.

```
Spawn 1 (Step 1): Foundation Research → writes 4 files
    ↓ READ all 4 files
Spawn 2 (Step 2): Competitor Analysis → writes 3 files (uses pain points + features from Step 1)
    ↓ READ all 7 files
Spawn 3 (Step 3): Diagrams → writes 1 file (uses features + competitors + audience)
    ↓ READ all 8 files
Spawn 4 (Step 4): PRD + Mockups → writes 2 files (synthesizes everything)
    ↓ READ all 10 files
Spawn 5 (Step 5): User Stories + Checklist → writes 3 files (based on PRD + diagrams)
```

### Between each spawn:
1. Wait for previous spawn to complete (use `sessions_yield`)
2. Read output files to verify completeness
3. Include KEY FINDINGS as context in the next spawn's task prompt
4. If a file is missing (timeout), write it manually before proceeding

### Timeout strategy:
- Set `runTimeoutSeconds: 600` (10 min) per spawn to allow thorough research
- Step 1 (foundation) may need the most time — it does web research
- Steps 3-5 are mostly synthesis and can be faster
