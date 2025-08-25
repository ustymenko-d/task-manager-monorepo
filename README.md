# Task Manager Turborepo

A monorepo-based Task Manager application built with Turborepo. It includes a NestJS API with Prisma, Next.js client and shared packages for seamless integration across backend and frontend.

---

## 🏗 Architecture

The repository is organized as a **monorepo** using **Turborepo**:

```
task-manager-turborepo/
├─ apps/
│  ├─ api/                # NestJS backend
│  └─ web/                # Next.js frontend
├─ packages/
│  ├─ api/                # shared DTOs and types
│  ├─ eslint-config       # `eslint` configurations (includes `prettier`)
│  ├─ jest-config         # `jest` configurations
│  └─ typescript-config   # `tsconfig.json`s used throughout the monorepo
├─ docker-compose.yml
├─ package.json
└─ turbo.json
```

---

## ⚡ Backend (NestJS + Prisma)

Provides a **RESTful API** for managing authentication, tasks and folders.

Built using:

<p>
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white" />
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
</p>

### Backend Project Setup

1. **Start PostgreSQL using Docker Compose:**

```bash
docker-compose up -d
```

- Database will be available at: `postgres://postgres:postgres@localhost:5433/turborepo_db`

2. **Configure Prisma:** Update the `.env` in `apps/api` if needed.

3. **Generate Prisma Client:**

```bash
cd apps/api
npx prisma generate
```

4. **Run Migrations:**

```bash
npx prisma migrate dev
```

5. **Run Prisma Studio (optional, to inspect DB):**

```bash
npx prisma studio
```

6. **Start Backend Server:**

```bash
pnpm run dev --filter api
```

---

## 🌐 Frontend (Next.js Client)

Provides a fast, responsive, and accessible UI with features like drag-and-drop task management and real-time updates via WebSockets.

Built using:

<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" />
  <img src="https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white" />
  <img src="https://img.shields.io/badge/DND--Kit-000000?style=for-the-badge&logo=javascript&logoColor=white" />
  <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Shadcn/UI-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/Radix-fff?style=for-the-badge&logo=radixui&logoColor=black" />
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
</p>

### Frontend Project Setup

1. **Install dependencies:**

```bash
pnpm install
```

2. **Start development server:**

```bash
pnpm run dev --filter web
```

---

## 🔀 Shared Packages

- `@repo/api`               — shared DTOs
- `@repo/shared`            — shared types and utilities
- `@repo/eslint-config`     — eslint configurations (includes `prettier`)
- `@repo/jest-config`       — jest configurations
- `@repo/typescript-config` — tsconfig.json used throughout the monorepo

> Packages are managed with **Turborepo** for caching and incremental builds.

---

## ⚙️ Monorepo Dev Commands (from root)

| Command          | Description                                             |
| ---------------- | ------------------------------------------------------- |
| `npm run dev`    | Runs all dev servers (frontend & backend) in watch mode |
| `npm run build`  | Builds all apps and packages                            |
| `npm run lint`   | Lints all packages and apps                             |
| `npm run test`   | Runs all tests                                          |
| `npm run format` | Formats all files using Prettier                        |

---

## 🐳 Docker Database Setup

PostgreSQL database is defined in `docker-compose.yml`. Use:

```bash
docker-compose up -d
```

- Container name: `turborepo_postgres`
- Port: `5433` (mapped to `5432` inside container)
- Default credentials:

  - User: `postgres`
  - Password: `postgres`
  - Database: `turborepo_db`

Volumes persist DB data across restarts.

---

## 📚 Notes

- Prisma Studio can be accessed via:

```bash
cd apps/api
npx prisma studio
```

- Shared types and DTOs are used across both frontend and backend for type safety.

---

## 👨‍💻 Author

**Denys Ustymenko**

- Email: [ustymenko.denys@gmail.com](mailto:ustymenko.denys@gmail.com)
- Portfolio: [https://ustymenko.vercel.app](https://ustymenko.vercel.app)
