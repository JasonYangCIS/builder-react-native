# builder-react-native

Expo (SDK 52) + Expo Router app that renders content from [Builder.io](https://www.builder.io) using `@builder.io/sdk-react-native` (Gen 2).

## Setup
1. `npm install`
2. `npx expo start` (the public Builder API key is committed in `src/lib/builder.ts`; override via `.env`, see `.env.example`)

## Layout
- `src/app/` – Expo Router routes (`index.tsx` fetches and renders a Builder `page` entry for `/`)
- `src/lib/builder.ts` – polyfills + fetch helper (imported once in `_layout.tsx`)
- `src/lib/custom-components.ts` – components registered for the Visual Editor
- `src/components/` – your RN components

## Notes
- Builder's RN SDK requires React 18, so Expo is pinned to SDK 52. Upgrading Expo to a React 19 SDK needs a newer Builder SDK.
- Not yet supported in the RN SDK: animations, video/embed/form blocks, SSR/SSG.
- To preview in the Visual Editor, set the model's preview URL to your running app.
