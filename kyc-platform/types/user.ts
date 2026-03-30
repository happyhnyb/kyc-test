export type UserRole = 'admin' | 'editor' | 'premium' | 'reader';

export interface Subscription {
  status: 'active' | 'none';
  plan: 'free' | 'monthly' | 'annual';
  expires_at: string | null;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password_hash: string;
  mobile: string | null;
  role: UserRole;
  auth_methods: string[];
  subscription: Subscription;
  created_at: string;
}

export interface SessionUser {
  _id: string;
  name: string;
  email?: string;
  role: UserRole;
  subscription: Subscription;
  auth_methods?: string[];
}
