# Safer Streets

This is the official mono repo for the [Safer Streets](https://saferstreets.info) project, a community driven hazard reporting platform dedicated to reporting safety issues in our public infrastructure. 

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager. It includes the following packages/apps:

- `main`: The main Safer Streets application, built in Vite.
- `site`: The informational site for the project, built in [Next.js](https://nextjs.org).
- `api`: The backend for connecting the `main` app to the database.

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Built on open source
This project was built off the back of open source projects, including but not limited to:
#### Frontend
- `react`: As our frontend framework
- `redux`: For our state management
- `tailwindcss` and `clsx`: For our CSS & Styling
- `remixicon`: For our iconography
- `cloudflare-pages`: For our SPA hosting

#### Mapping
- `maplibre-gl`: For vector-based map rendering,
- `maptiler`: For vector based tilesets, and geocoding,

#### Backend & Database
- `mongodb`: As our NoSQL Databse 
- `prisma`: As our typesafe ORM
- `cloudflare-workers`: For our API hosting
- 
#### Utilities

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
yarn run build
```

### Develop

To develop all apps and packages, run the following command:

```
yarn run dev
```