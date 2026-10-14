import { Text, View } from 'react-native';

import { colors } from '@/lib/theme';

export interface TestimonialProps {
  quote: string;
  author: string;
  role?: string;
}

export function Testimonial({ quote, author, role }: TestimonialProps) {
  return (
    <View
      style={{
        margin: 16,
        padding: 20,
        borderRadius: 12,
        backgroundColor: colors.surface,
        borderLeftWidth: 4,
        borderLeftColor: colors.primary,
      }}>
      <Text style={{ fontSize: 16, fontStyle: 'italic', color: colors.text }}>“{quote}”</Text>
      <Text style={{ marginTop: 12, fontWeight: '700', color: colors.text }}>{author}</Text>
      {role ? <Text style={{ color: colors.muted }}>{role}</Text> : null}
    </View>
  );
}
