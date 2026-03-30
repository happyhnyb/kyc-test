import type { Post } from '@/types/post';
import { INITIAL_POSTS } from '@/mocks/data';
import { generateId, generateSlug } from '@/lib/utils';

let memoryPosts = [...INITIAL_POSTS];

export interface CreatePostInput {
  title: string;
  excerpt: string;
  body: string;
  category: string;
  type: Post['type'];
  tags: string[];
  is_premium: boolean;
  author: string;
  author_id: string;
  status?: Post['status'];
}

export const postsAdapter = {
  async listPublished() {
    return memoryPosts.filter((p) => p.status === 'published').sort((a, b) => (b.published_at || '').localeCompare(a.published_at || ''));
  },
  async listAll() {
    return [...memoryPosts].sort((a, b) => b.updated_at.localeCompare(a.updated_at));
  },
  async getBySlug(slug: string) {
    return memoryPosts.find((p) => p.slug === slug) ?? null;
  },
  async search(query: string) {
    const q = query.toLowerCase();
    return memoryPosts.filter((p) => p.status === 'published' && (
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.body.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q))
    ));
  },
  async incrementViews(slug: string) {
    memoryPosts = memoryPosts.map((p) => p.slug === slug ? { ...p, view_count: p.view_count + 1 } : p);
  },
  async create(input: CreatePostInput) {
    const now = new Date().toISOString();
    const post: Post = {
      _id: generateId('p'),
      title: input.title,
      slug: generateSlug(input.title),
      excerpt: input.excerpt,
      body: input.body,
      category: input.category,
      type: input.type,
      tags: input.tags,
      is_premium: input.is_premium,
      author: input.author,
      author_id: input.author_id,
      status: input.status ?? 'draft',
      published_at: input.status === 'published' ? now : null,
      created_at: now,
      updated_at: now,
      view_count: 0,
      img: 'crops',
      hero_image: null
    };
    memoryPosts = [post, ...memoryPosts];
    return post;
  }
};
