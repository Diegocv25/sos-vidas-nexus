import { useEffect, useState } from 'react';
import { getOwnProfile } from '@/services/auth';
import { useSession } from '@/hooks/useSession';

export function useProfile() {
  const { session, loading: sessionLoading } = useSession();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionLoading) return;
    if (!session?.user?.id) {
      setProfile(null);
      setLoading(false);
      return;
    }

    getOwnProfile(session.user.id)
      .then(setProfile)
      .finally(() => setLoading(false));
  }, [session?.user?.id, sessionLoading]);

  return { profile, loading, session };
}
