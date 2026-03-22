import { router } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { AppHeader } from '@/components/AppHeader';
import { SectionCard } from '@/components/SectionCard';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';

export default function AjudaScreen() {
  return (
    <Screen>
      <AppHeader title="Ajuda rápida" subtitle="Atalhos internos para as áreas principais do app." />

      <SectionCard title="Se você não sabe identificar a situação">
        <Text style={styles.text}>Use a tela de triagem guiada para entender quando chamar 192 (SAMU) ou 193 (Bombeiros).</Text>
        <AppButton label="Abrir Não sei identificar" onPress={() => router.push('/(app)/nao-sei-identificar')} />
      </SectionCard>

      <SectionCard title="Se você sabe o tipo de ocorrência">
        <Text style={styles.text}>Use a área de primeiros socorros para abrir a ficha interna daquele tema com conteúdo oficial organizado.</Text>
        <AppButton label="Abrir Primeiros Socorros" variant="secondary" onPress={() => router.push('/(app)/primeiros-socorros')} />
      </SectionCard>

      <SectionCard title="Se precisa de unidade próxima">
        <Text style={styles.text}>Use Mapas para localizar hospitais, UPAs 24h e centros de saúde mais próximos.</Text>
        <AppButton label="Abrir Mapas" variant="secondary" onPress={() => router.push('/(app)/mapas')} />
      </SectionCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: { color: colors.text, lineHeight: 22 },
});
