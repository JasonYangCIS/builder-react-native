import { ImageBackground, Linking, Pressable, Text, View } from 'react-native';

import { colors } from '@/lib/theme';

export interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  buttonText?: string;
  buttonLink?: string;
}

export function Hero({ title, subtitle, backgroundImage, buttonText, buttonLink }: HeroProps) {
  return (
    <ImageBackground
      source={backgroundImage ? { uri: backgroundImage } : undefined}
      style={{ backgroundColor: colors.text, minHeight: 280, justifyContent: 'center' }}>
      <View style={{ padding: 24, backgroundColor: 'rgba(0,0,0,0.4)', flex: 1, justifyContent: 'center' }}>
        <Text style={{ color: colors.white, fontSize: 32, fontWeight: '800' }}>{title}</Text>
        {subtitle ? (
          <Text style={{ color: colors.white, fontSize: 16, marginTop: 8 }}>{subtitle}</Text>
        ) : null}
        {buttonText ? (
          <Pressable
            onPress={() => buttonLink && Linking.openURL(buttonLink)}
            style={{
              alignSelf: 'flex-start',
              marginTop: 20,
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 8,
              backgroundColor: colors.primary,
            }}>
            <Text style={{ color: colors.white, fontWeight: '700' }}>{buttonText}</Text>
          </Pressable>
        ) : null}
      </View>
    </ImageBackground>
  );
}
