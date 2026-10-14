import { Content, isEditing, isPreviewing, type BuilderContent } from '@builder.io/sdk-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import { BUILDER_API_KEY, BUILDER_MODEL, fetchPage } from '@/lib/builder';
import { customComponents } from '@/lib/custom-components';

// Renders the Builder entry whose URL matches `path`. Also works inside the Builder
// Visual Editor: while editing/previewing, the SDK receives the entry from the editor,
// so we render <Content> even when nothing is published at this path yet.
export function BuilderPage({ path }: { path: string }) {
  const [content, setContent] = useState<BuilderContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchPage(path)
      .then((entry) => !cancelled && setContent(entry))
      .catch((e) => !cancelled && setError(String(e)))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [path]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
  if (error) return <Message text={error} />;
  if (!content && !isEditing() && !isPreviewing()) {
    return <Message text={`No Builder "${BUILDER_MODEL}" entry found for "${path}".`} />;
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <Content
        content={content}
        model={BUILDER_MODEL}
        apiKey={BUILDER_API_KEY}
        customComponents={customComponents}
        // The SDK defaults both wrappers to ScrollView, which nests scroll views.
        // We provide the single ScrollView above instead. (The SDK's block list is also
        // patched to a plain View, see patches/.)
        contentWrapper={View}
        blocksWrapper={View}
      />
    </ScrollView>
  );
}

function Message({ text }: { text: string }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text>{text}</Text>
    </View>
  );
}
