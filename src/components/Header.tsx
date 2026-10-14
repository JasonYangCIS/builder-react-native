import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/lib/theme';

export function Header() {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: top + 12,
        paddingBottom: 12,
        paddingHorizontal: 16,
        backgroundColor: colors.primary,
      }}>
      <Text style={{ color: colors.white, fontSize: 20, fontWeight: '800' }}>Builder RN Demo</Text>
    </View>
  );
}
