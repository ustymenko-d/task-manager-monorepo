# Build stage
FROM node:18-alpine AS builder
WORKDIR /workspace

RUN corepack enable && corepack prepare pnpm@8.15.5 --activate

COPY package.json pnpm-lock.yaml turbo.json ./
COPY packages/shared/package.json packages/shared/
COPY apps/api/package.json apps/api/

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm --filter=api exec prisma generate

RUN pnpm --filter=api run build

RUN pnpm --filter=api exec tsc-alias -p apps/api/tsconfig.build.json

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /workspace/apps/api/dist ./dist
COPY --from=builder /workspace/node_modules ./node_modules
COPY --from=builder /workspace/pnpm-lock.yaml ./

ENV NODE_ENV=production

CMD ["node", "dist/main.js"]