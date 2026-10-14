import 'react-native-url-polyfill/auto';
import 'regenerator-runtime/runtime';

import { fetchEntries, fetchOneEntry, type BuilderContent } from '@builder.io/sdk-react-native';

// Builder public API key: safe to commit (it only allows reading published content and is
// shipped in every client bundle anyway). Override with EXPO_PUBLIC_BUILDER_API_KEY if needed.
export const BUILDER_API_KEY =
  process.env.EXPO_PUBLIC_BUILDER_API_KEY || '12340ae46aea49f4a97ac5c66d466897';
export const BUILDER_MODEL = process.env.EXPO_PUBLIC_BUILDER_MODEL ?? 'page';

// Builder's tracking pixel block carries DOM-style string props (`aria-hidden: "true"`),
// which React Native's native View rejects ("expected boolean, but had type string").
function normalizePixelBlocks(entry: BuilderContent | null): BuilderContent | null {
  const blocks = entry?.data?.blocks;
  if (!entry || !blocks) return entry;
  return {
    ...entry,
    data: {
      ...entry.data,
      blocks: blocks.map((block: any) =>
        block.id?.startsWith('builder-pixel-') && block.properties
          ? { ...block, properties: { ...block.properties, 'aria-hidden': true } }
          : block
      ),
    },
  };
}

export async function fetchPage(urlPath: string) {
  const entry = await fetchOneEntry({
    model: BUILDER_MODEL,
    apiKey: BUILDER_API_KEY,
    userAttributes: { urlPath },
  });
  return normalizePixelBlocks(entry);
}

export interface NavPage {
  title: string;
  url: string;
}

// Published `page` entries, used to build the header menu so pages created in Builder
// show up without a code change.
export async function fetchNavPages(): Promise<NavPage[]> {
  const entries = await fetchEntries({
    model: BUILDER_MODEL,
    apiKey: BUILDER_API_KEY,
    limit: 50,
    fields: 'name,data.url,data.title',
    options: { noTargeting: true },
  });
  return (entries ?? [])
    .map((e: any) => ({ title: e.data?.title || e.name, url: e.data?.url as string }))
    .filter((p) => typeof p.url === 'string' && p.url.startsWith('/'))
    .sort((a, b) => a.url.length - b.url.length);
}
