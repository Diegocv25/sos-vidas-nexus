import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Linking, StyleSheet, Text } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { FirstAidTopicCard } from '@/components/FirstAidTopicCard';
import { Screen } from '@/components/Screen';
import { EMERGENCY_DISCLAIMER } from '@/constants/app';
import { FIRST_AID_GENERAL_URL, FIRST_AID_TOPICS } from '@/constants/firstAid';
import { colors } from '@/constants/theme';

export default function PrimeirosSocorrosScreen() {
  const [query, setQuery] = useState('');

  const filteredTopics = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FIRST_AID_TOPICS;
    return FIRST_AID_TOPICS.filter((item) => `${item.label} ${item.emoji}`.toLowerCase().includes(q));
  }, [query]);

  function handleFallbackSearch() {
    Alert.alert(
      'Busca inteligente',
      'A busca semântica/RAG será ligada na próxima etapa. Por enquanto, use as categorias oficiais abaixo ou abra a página geral.',
      [
        { text: 'Abrir geral', onPress: () => Linking.openURL(FIRST_AID_GENERAL_URL) },
        { text: 'Ligar 192', onPress: () => Linking.openURL('tel:192') },
        { text: 'Cancelar', style: 'cancel' },
      ],
    );
  }

  return (
    <Screen>
      <Text style={styles.title}>Primeiros Socorros</Text>
      <Text style={styles.text}>Acesso por busca e por categorias oficiais. A etapa de RAG ainda será ligada por cima desta base.</Text>

      <AppInput
        label="Descreva o que está acontecendo..."
        placeholder="Ex.: pessoa engasgando, queimadura, desmaio"
        value={query}
        onChangeText={setQuery}
        hint="Nesta etapa, o campo funciona como filtro local enquanto preparamos a busca semântica."
      />
      <AppButton label="Buscar" onPress={handleFallbackSearch} />
      <AppButton label="Não sei identificar" variant="secondary" onPress={() => router.push('/(app)/nao-sei-identificar')} />

      <Text style={styles.section}>Categorias rápidas</Text>
      {filteredTopics.map((topic) => (
        <FirstAidTopicCard
          key={topic.id}
          emoji={topic.emoji}
          label={topic.label}
          url={topic.url}
          emergencyNumber={topic.emergencyNumber}
        />
      ))}

      <Text style={styles.disclaimer}>{EMERGENCY_DISCLAIMER}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  text: { color: colors.muted, marginTop: 10, lineHeight: 22 },
  section: { color: colors.primarySoft, marginTop: 22, fontWeight: '800', fontSize: 16 },
  disclaimer: { color: colors.muted, marginTop: 20, fontSize: 12, lineHeight: 18 },
});
