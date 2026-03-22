import { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps, Pressable } from 'react-native';
import { colors } from '@/constants/theme';

type Props = TextInputProps & { label: string; hint?: string; passwordToggle?: boolean };

export function AppInput({ label, hint, passwordToggle = false, secureTextEntry, ...props }: Props) {
  const [visible, setVisible] = useState(false);
  const isPassword = passwordToggle || secureTextEntry;

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <TextInput
          placeholderTextColor={colors.muted}
          style={styles.input}
          secureTextEntry={isPassword ? !visible : false}
          {...props}
        />
        {isPassword ? (
          <Pressable onPress={() => setVisible((v) => !v)} style={styles.eyeBtn}>
            <Text style={styles.eyeText}>{visible ? '🙈' : '👁️'}</Text>
          </Pressable>
        ) : null}
      </View>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 14 },
  label: { color: colors.text, fontSize: 14, fontWeight: '600', marginBottom: 8 },
  inputWrap: {
    minHeight: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: colors.text,
    paddingHorizontal: 16,
    fontSize: 16,
    minHeight: 56,
  },
  eyeBtn: {
    width: 52,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeText: { fontSize: 18 },
  hint: { color: colors.muted, fontSize: 12, marginTop: 6 },
});
