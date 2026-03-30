import { INITIAL_CONTACTS } from '@/mocks/data';
import type { ContactSubmission } from '@/types/post';
import { generateId, sanitize } from '@/lib/utils';

let contacts = [...INITIAL_CONTACTS];

export const contactsAdapter = {
  async list() {
    return [...contacts].sort((a, b) => b.submitted_at.localeCompare(a.submitted_at));
  },
  async create(input: { name: string; email: string; subject: string; message: string; }) {
    const ref = `KYC-${Date.now().toString(36).toUpperCase()}`;
    const entry: ContactSubmission = {
      _id: generateId('c'),
      name: sanitize(input.name),
      email: sanitize(input.email),
      subject: sanitize(input.subject),
      message: sanitize(input.message),
      submitted_at: new Date().toISOString(),
      status: 'new',
      ref
    };
    contacts = [entry, ...contacts];
    return entry;
  }
};
