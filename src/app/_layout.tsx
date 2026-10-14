import '@/lib/builder';

import { Stack } from 'expo-router';
import { View } from 'react-native';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
      <Footer />
    </View>
  );
}
