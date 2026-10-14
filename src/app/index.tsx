import { Content, isPreviewing, type BuilderContent } from '@builder.io/sdk-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { customComponents } from '@/lib/custom-components';
import { BUILDER_API_KEY, BUILDER_MODEL, fetchPage } from '@/lib/builder';

export default function Home() {
  const [content, setContent] = useState<BuilderContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPage('/')
      .then((entry) => setContent(entry ?? null))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  if (!BUILDER_API_KEY) {
    return <Message text="Set EXPO_PUBLIC_BUILDER_API_KEY in .env (see .env.example)." />;
  }
  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
  if (error) return <Message text={error} />;
  if (!content && !isPreviewing()) {
    return <Message text={`No Builder "${BUILDER_MODEL}" entry found for "/".`} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Content
        content={content}
        model={BUILDER_MODEL}
        apiKey={BUILDER_API_KEY}
        customComponents={customComponents}
        // The SDK defaults both wrappers to ScrollView and renders blocks in a FlatList,
        // which triggers React Native's nested VirtualizedList warning.
        contentWrapper={View}
        contentWrapperProps={{ style: { flex: 1 } }}
        blocksWrapper={View}
        blocksWrapperProps={{ style: { flex: 1 } }}
      />
    </View>
  );
}

function Message({ text }: { text: string }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text>{text}</Text>
    </View>
  );
}
