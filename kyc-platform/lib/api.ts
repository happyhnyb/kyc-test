import { contactsAdapter, postsAdapter, usersAdapter } from '@/lib/adapters';
import type { SessionUser } from '@/types/user';

export async function getPosts() {
  return postsAdapter.listPublished();
}

export async function getAllPosts() {
  return postsAdapter.listAll();
}

export async function getPost(slug: string) {
  return postsAdapter.getBySlug(slug);
}

export async function searchPosts(query: string) {
  return postsAdapter.search(query);
}

export async function loginUser(email: string, password: string): Promise<SessionUser | null> {
  return usersAdapter.login(email, password);
}

export async function getUsers() {
  return usersAdapter.list();
}

export async function getContacts() {
  return contactsAdapter.list();
}
