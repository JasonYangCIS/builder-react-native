import { isEditing } from '@builder.io/sdk-react-native';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { fetchNavPages, type NavPage } from '@/lib/builder';
import { colors } from '@/lib/theme';

export function Header() {
  const { top } = useSafeAreaInsets();
  const [pages, setPages] = useState<NavPage[]>([]);

  useEffect(() => {
    // Keep the menu out of the Visual Editor so clicks don't navigate the preview away.
    if (isEditing()) return;
    fetchNavPages().then(setPages).catch(() => setPages([]));
  }, []);

  return (
    <View
      style={{
        paddingTop: top + 12,
        paddingBottom: 12,
        paddingHorizontal: 16,
        backgroundColor: colors.primary,
      }}>
      <Text style={{ color: colors.white, fontSize: 20, fontWeight: '800' }}>Builder RN Demo</Text>
      {pages.length > 1 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
          {pages.map((page) => (
            <Link
              key={page.url}
              href={page.url as any}
              style={{ color: colors.white, marginRight: 16, fontWeight: '600' }}>
              {page.url === '/' ? 'Home' : page.title}
            </Link>
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
}
