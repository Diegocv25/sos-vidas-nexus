import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { Screen } from '@/components/Screen';
import { APP_NAME, APP_PRICE_LABEL, KIWIFY_CHECKOUT_URL, PAYMENT_BENEFITS } from '@/constants/app';
import { colors } from '@/constants/theme';

export default function PagamentoScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Assinatura</Text>
      <Text style={styles.appName}>{APP_NAME}</Text>
      <Text style={styles.price}>{APP_PRICE_LABEL}</Text>

      <View style={styles.card}>
        {PAYMENT_BENEFITS.map((item) => (
          <Text key={item} style={styles.item}>• {item}</Text>
        ))}
      </View>

      <AppButton label="ASSINAR AGORA" onPress={() => KIWIFY_CHECKOUT_URL && Linking.openURL(KIWIFY_CHECKOUT_URL)} disabled={!KIWIFY_CHECKOUT_URL} />
      <AppButton label="Já paguei — Ir para login" variant="secondary" onPress={() => router.replace('/(auth)/login')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  appName: { color: colors.text, fontSize: 18, marginTop: 14, fontWeight: '700' },
  price: { color: colors.primarySoft, marginTop: 8, fontSize: 22, fontWeight: '800' },
  card: { marginTop: 20, borderRadius: 18, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, padding: 18, gap: 12 },
  item: { color: colors.text, lineHeight: 22 },
});
