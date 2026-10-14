import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/lib/theme';

export function Footer() {
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: 12,
        paddingBottom: bottom + 12,
        alignItems: 'center',
        backgroundColor: colors.surface,
      }}>
      <Text style={{ color: colors.muted, fontSize: 12 }}>
        © {new Date().getFullYear()} Builder RN Demo · Powered by Builder.io
      </Text>
    </View>
  );
}
