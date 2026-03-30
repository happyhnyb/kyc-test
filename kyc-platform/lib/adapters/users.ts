import { INITIAL_USERS } from '@/mocks/data';
import type { SessionUser, User } from '@/types/user';

const users = [...INITIAL_USERS];

export const usersAdapter = {
  async list(): Promise<User[]> {
    return [...users];
  },
  async login(email: string, password: string): Promise<SessionUser | null> {
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password_hash === password);
    if (!user) return null;
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      subscription: user.subscription,
      auth_methods: user.auth_methods
    };
  },
  async getByEmail(email: string) {
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
  }
};
