import { Image, Text, View } from 'react-native';

import { colors } from '@/lib/theme';

export interface ProductCardProps {
  name: string;
  price: number;
  description?: string;
  image?: string;
}

export function ProductCard({ name, price, description, image }: ProductCardProps) {
  return (
    <View
      style={{
        margin: 16,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.surface,
      }}>
      {image ? (
        <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} resizeMode="cover" />
      ) : (
        <View style={{ height: 200, backgroundColor: colors.surface }} />
      )}
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text }}>{name}</Text>
        {description ? (
          <Text style={{ marginTop: 4, color: colors.muted }}>{description}</Text>
        ) : null}
        <Text style={{ marginTop: 8, fontSize: 18, fontWeight: '800', color: colors.primary }}>
          ${price.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
