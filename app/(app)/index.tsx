import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { Screen } from '@/components/Screen';
import { StatusBanner } from '@/components/StatusBanner';
import { EMERGENCY_DISCLAIMER } from '@/constants/app';
import { colors } from '@/constants/theme';
import { useProfile } from '@/hooks/useProfile';
import { getSubscriptionUi } from '@/services/subscription';

export default function HomeScreen() {
  const { profile } = useProfile();
  const subscriptionUi = getSubscriptionUi(profile);

  return (
    <Screen style={styles.container}>
      <View>
        <Text style={styles.title}>SOS Vidas</Text>
        <Text style={styles.subtitle}>Acesso rápido a ajuda oficial em momentos de emergência.</Text>
        {subscriptionUi.banner ? <StatusBanner text={subscriptionUi.banner} severity={subscriptionUi.severity} /> : null}
      </View>
      <View>
        <AppButton label="🗺️ MAPAS — Unidades próximas" onPress={() => router.push('/(app)/mapas')} />
        <AppButton label="🚨 EMERGÊNCIAS — Números do Brasil" variant="secondary" onPress={() => router.push('/(app)/emergencias')} />
        <AppButton label="🩹 PRIMEIROS SOCORROS — O que fazer agora?" variant="secondary" onPress={() => router.push('/(app)/primeiros-socorros')} />
      </View>
      <Text style={styles.disclaimer}>{EMERGENCY_DISCLAIMER}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'space-between', paddingTop: 48, paddingBottom: 32 },
  title: { color: colors.text, fontSize: 30, fontWeight: '800' },
  subtitle: { color: colors.muted, marginTop: 12, lineHeight: 24 },
  disclaimer: { color: colors.muted, fontSize: 12, lineHeight: 18 },
});
