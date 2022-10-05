# Safer Streets

This is the official mono repo for the [Safer Streets](https://saferstreets.info) project, a community driven hazard reporting platform dedicated to reporting safety issues in our public infrastructure.

### Built on open source
This project was built off the back of open source projects, including but not limited to:
#### Frontend
- `react`: As our frontend framework
- `zustand`: For our state management
- `tailwindcss` and `clsx`: For our CSS & Styling
- `nucleo`: For our iconography
- `cloudflare-pages`: For our SPA hosting

#### Mapping
- `maplibre-gl`: For vector-based map rendering,
- `maptiler`: For vector based tilesets, and geocoding,

#### Backend & Database
- `supabase`: As application infrastructure 
- `cloudflare-workers`: For our API hosting

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
