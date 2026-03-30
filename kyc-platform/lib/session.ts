import { cookies } from 'next/headers';
import type { SessionUser } from '@/types/user';

const COOKIE_NAME = 'kyc_session';

export async function getServerSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}
