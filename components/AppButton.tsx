import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '@/constants/theme';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
};

export function AppButton({ label, onPress, variant = 'primary', disabled }: Props) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [styles.base, styles[variant], pressed && !disabled ? styles.pressed : null, disabled ? styles.disabled : null]}>
      <Text style={[styles.text, variant === 'ghost' ? styles.ghostText : null]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    marginTop: 12,
  },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.cardAlt, borderWidth: 1, borderColor: colors.border },
  ghost: { backgroundColor: 'transparent' },
  pressed: { opacity: 0.88 },
  disabled: { opacity: 0.5 },
  text: { color: colors.text, fontSize: 16, fontWeight: '700' },
  ghostText: { color: colors.primarySoft },
});
