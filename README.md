# AI CommerceHub

AI CommerceHub is an npm-workspaces monorepo with two independent Next.js applications and shared static reference data.

## Applications

- `apps/admin` — business management dashboard for the single-vendor, multi-branch organization.
- `apps/storefront` — customer-facing sample storefront, with a separate layout and visual system.
- `packages/shared` — shared TypeScript domain types, constants, and formatting helpers.
- `data/` — static JSON references for administration, organization, branches, employees, products, inventory, and storefront content.

## Development

From the repository root, run each command in a separate terminal:

```bash
npm install
npm run dev:admin       # http://localhost:3000
npm run dev:storefront  # http://localhost:3001
```

## Checks and builds

```bash
npm run lint
npm run build:admin
npm run build:storefront
npm run typecheck --workspace=@ai-commercehub/admin
npm run typecheck --workspace=@ai-commercehub/storefront
```

All data is sample/static reference data. Interface-only interactions use temporary React state; there is no backend, data persistence, transaction processing, authentication, or authorization in this phase.
