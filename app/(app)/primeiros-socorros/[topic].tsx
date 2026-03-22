import { useLocalSearchParams } from 'expo-router';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { Screen } from '@/components/Screen';
import { FIRST_AID_CONTENT } from '@/constants/firstAidContent';
import { colors } from '@/constants/theme';

function Block({ title, body, source }: { title: string; body: string[]; source: string }) {
  return (
    <View style={styles.block}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {body.map((paragraph, index) => (
        <Text key={`${title}-${index}`} style={styles.text}>{paragraph}</Text>
      ))}
      <Text style={styles.source}>Fonte: {source}</Text>
    </View>
  );
}

export default function FirstAidDetailScreen() {
  const params = useLocalSearchParams<{ topic?: string }>();
  const topicId = Array.isArray(params.topic) ? params.topic[0] : params.topic;
  const content = topicId ? FIRST_AID_CONTENT[topicId] : null;

  if (!content) {
    return (
      <Screen>
        <Text style={styles.title}>Conteúdo não encontrado</Text>
        <Text style={styles.text}>Esta situação ainda não teve o texto interno completo preparado. Use a fonte oficial completa enquanto finalizamos as outras fichas.</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={styles.title}>{content.title}</Text>
      <Text style={styles.intro}>Conteúdo organizado a partir de fontes públicas/oficiais para facilitar a leitura dentro do app.</Text>

      {content.blocks.whatIs ? <Block title={content.blocks.whatIs.title} body={content.blocks.whatIs.body} source={content.blocks.whatIs.source} /> : null}
      {content.blocks.symptoms ? <Block title={content.blocks.symptoms.title} body={content.blocks.symptoms.body} source={content.blocks.symptoms.source} /> : null}
      {content.blocks.prevention ? <Block title={content.blocks.prevention.title} body={content.blocks.prevention.body} source={content.blocks.prevention.source} /> : null}
      {content.blocks.firstAid ? <Block title={content.blocks.firstAid.title} body={content.blocks.firstAid.body} source={content.blocks.firstAid.source} /> : null}

      <View style={styles.block}>
        <Text style={styles.sectionTitle}>Ligar para emergência</Text>
        {content.emergencyRules.map((rule, index) => (
          <Text key={`rule-${index}`} style={styles.text}>{rule.when}</Text>
        ))}
        {content.emergencyRules.map((rule, index) => (
          <Text key={`rule-src-${index}`} style={styles.source}>Fonte: {rule.source}</Text>
        ))}
      </View>

      <View style={styles.block}>
        <Text style={styles.sectionTitle}>Fontes oficiais</Text>
        {content.references.map((ref) => (
          <View key={ref.url} style={styles.refWrap}>
            <Text style={styles.text}>{ref.label}</Text>
            <Text style={styles.link}>{ref.url}</Text>
          </View>
        ))}
      </View>

      {content.references.map((ref) => (
        <AppButton key={`btn-${ref.url}`} label={`Abrir fonte: ${ref.label}`} variant="secondary" onPress={() => Linking.openURL(ref.url)} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  intro: { color: colors.muted, marginTop: 12, lineHeight: 22 },
  block: { marginTop: 20, borderRadius: 18, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, padding: 16 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '800' },
  text: { color: colors.text, marginTop: 10, lineHeight: 22 },
  source: { color: colors.primarySoft, marginTop: 12, fontWeight: '700' },
  refWrap: { marginTop: 12 },
  link: { color: colors.muted, marginTop: 4, lineHeight: 20 },
});
