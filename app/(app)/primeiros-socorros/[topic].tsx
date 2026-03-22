import { useLocalSearchParams } from 'expo-router';
import { Linking, StyleSheet, Text } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { Screen } from '@/components/Screen';
import { FIRST_AID_CONTENT } from '@/constants/firstAidContent';
import { colors } from '@/constants/theme';

export default function FirstAidDetailScreen() {
  const params = useLocalSearchParams<{ topic?: string }>();
  const topicId = Array.isArray(params.topic) ? params.topic[0] : params.topic;
  const content = topicId ? FIRST_AID_CONTENT[topicId] : null;

  if (!content) {
    return (
      <Screen>
        <Text style={styles.title}>Conteúdo não encontrado</Text>
        <Text style={styles.text}>Esta situação ainda não teve o texto oficial interno preparado. Use o botão da categoria para abrir a fonte oficial completa.</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={styles.title}>{content.title}</Text>
      <Text style={styles.source}>Texto extraído da fonte oficial: {content.officialSource}</Text>
      <Text style={styles.link}>{content.officialUrl}</Text>

      {content.sections.map((section) => (
        <>
          <Text key={`${section.title}-title`} style={styles.sectionTitle}>{section.title}</Text>
          {section.body.map((paragraph, index) => (
            <Text key={`${section.title}-${index}`} style={styles.text}>{paragraph}</Text>
          ))}
        </>
      ))}

      <AppButton label="Abrir fonte oficial" variant="secondary" onPress={() => Linking.openURL(content.officialUrl)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  source: { color: colors.primarySoft, marginTop: 12, fontWeight: '700' },
  link: { color: colors.muted, marginTop: 6, lineHeight: 20 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '800', marginTop: 20 },
  text: { color: colors.text, marginTop: 10, lineHeight: 22 },
});
