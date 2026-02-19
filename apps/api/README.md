# Pandemonium API

## Setup

1. Copy `.env.example` to `.env` in the root.
2. Start the database:
   ```bash
   docker compose --env-file .env.dev up -d postgres redis
   ```
3. Run migrations:
   ```bash
   cd apps/api
   npx prisma migrate dev --name init
   ```
4. Seed data:
   ```bash
   npx ts-node prisma/seed.ts
   ```

## Running

```bash
pnpm --filter api start:dev
```

## API Endpoints

- `GET /api/v1/health`: Service health check
- `GET /api/v1/incidents`: List incidents (supports filtering)
