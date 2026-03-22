export type ProfileSubscription = {
  is_subscribed?: boolean;
  subscription_status?: string | null;
  updated_at?: string | null;
  created_at?: string | null;
};

export function getSubscriptionUi(profile: ProfileSubscription | null) {
  if (!profile) {
    return { blocked: true, banner: 'Assinatura não identificada. Regularize o acesso.', severity: 'danger' as const };
  }

  if (!profile.is_subscribed || profile.subscription_status !== 'active') {
    return { blocked: true, banner: 'Assinatura inativa. Regularize o pagamento para continuar usando o app.', severity: 'danger' as const };
  }

  const baseDate = profile.updated_at || profile.created_at;
  if (!baseDate) {
    return { blocked: false, banner: null, severity: 'info' as const };
  }

  const updated = new Date(baseDate);
  const due = new Date(updated);
  due.setDate(due.getDate() + 60);
  const warn = new Date(due);
  warn.setDate(warn.getDate() - 5);
  const now = new Date();

  if (now >= warn && now < due) {
    const diffMs = due.getTime() - now.getTime();
    const daysLeft = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    return {
      blocked: false,
      banner: `Sua assinatura vence em ${daysLeft} dia(s). Regularize o pagamento para não perder o acesso.`,
      severity: 'warning' as const,
    };
  }

  return { blocked: false, banner: null, severity: 'info' as const };
}
