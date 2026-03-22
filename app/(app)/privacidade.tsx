import { StyleSheet, Text } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { SectionCard } from '@/components/SectionCard';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';

export default function PrivacidadeScreen() {
  return (
    <Screen>
      <AppHeader title="Privacidade" subtitle="Resumo institucional do tratamento de dados no SOS Vidas." />

      <SectionCard title="Dados tratados">
        <Text style={styles.text}>Nome completo, CPF, email, dados de endereço, status de assinatura e informações mínimas necessárias ao funcionamento do aplicativo.</Text>
      </SectionCard>

      <SectionCard title="Finalidade">
        <Text style={styles.text}>Autenticação, controle de acesso por assinatura, confirmação de email, recuperação de senha e uso funcional dos recursos do app.</Text>
      </SectionCard>

      <SectionCard title="Localização">
        <Text style={styles.text}>A localização pode ser solicitada para exibir hospitais, UPAs 24h e centros de saúde próximos ao usuário.</Text>
      </SectionCard>

      <SectionCard title="Responsabilidade do conteúdo">
        <Text style={styles.text}>O aplicativo organiza conteúdos oficiais de órgãos públicos e instituições oficiais. Ele não substitui atendimento profissional, diagnóstico ou tratamento.</Text>
      </SectionCard>

      <SectionCard title="Observação">
        <Text style={styles.text}>Antes da publicação final em loja, esta tela poderá apontar para a política de privacidade oficial hospedada no domínio definitivo do projeto.</Text>
      </SectionCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: { color: colors.text, lineHeight: 22 },
});
