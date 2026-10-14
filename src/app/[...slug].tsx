import { useLocalSearchParams } from 'expo-router';

import { BuilderPage } from '@/components/BuilderPage';

// Catch-all: any path (e.g. /about) renders the Builder `page` entry with that URL.
export default function Page() {
  const { slug } = useLocalSearchParams<{ slug: string | string[] }>();
  const segments = Array.isArray(slug) ? slug : [slug];
  return <BuilderPage path={'/' + segments.join('/')} />;
}
