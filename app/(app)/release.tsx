import Constants from 'expo-constants';
import { StyleSheet, Text } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { SectionCard } from '@/components/SectionCard';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';

export default function ReleaseScreen() {
  const expo = Constants.expoConfig;

  return (
    <Screen>
      <AppHeader title="Release" subtitle="Resumo técnico da versão instalada/configurada do app." />

      <SectionCard title="Aplicativo">
        <Text style={styles.text}>Nome: {expo?.name ?? '—'}</Text>
        <Text style={styles.text}>Slug: {expo?.slug ?? '—'}</Text>
        <Text style={styles.text}>Versão: {expo?.version ?? '—'}</Text>
        <Text style={styles.text}>Scheme: {expo?.scheme ?? '—'}</Text>
      </SectionCard>

      <SectionCard title="Identificadores">
        <Text style={styles.text}>Android package: {expo?.android?.package ?? '—'}</Text>
        <Text style={styles.text}>iOS bundle: {expo?.ios?.bundleIdentifier ?? '—'}</Text>
      </SectionCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: { color: colors.text, lineHeight: 24 },
});
