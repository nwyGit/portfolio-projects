# portfolio-projects

Next.js monorepo for Raymond Ng's personal site and related apps. Each package has its own dependencies. There is no root workspace.

## Packages

### profile

Personal site: a Next.js portfolio and blog, with content in Sanity.

Live: [https://www.raymond-ng.com](https://www.raymond-ng.com)

`profile/.env.example` lists the Sanity variables the site expects. Copy it to `profile/.env` locally. `.env` files are gitignored.

### Prognolytics

Receipt and expense tracking. The Next.js client is in `Prognolytics/client`. The Express API is in `Prognolytics/server`.

Live: [https://prognolytics.vercel.app](https://prognolytics.vercel.app)

### Homiecomb

Listings app in `homie-comb`: a Next.js frontend and a Spring Boot backend. This service is retired.

## Local development

From the package you want to run:

```bash
npm install
npm run dev
```

The Homiecomb API is a Maven project (`homie-comb/backend`). It is retired along with the rest of that service.
