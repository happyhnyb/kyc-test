export type PostType = 'SHORT' | 'STORY' | 'ARTICLE';
export type PostStatus = 'draft' | 'published' | 'archived';

export interface Post {
  _id: string;
  type: PostType;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  author: string;
  author_id: string;
  tags: string[];
  category: string;
  is_premium: boolean;
  status: PostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  view_count: number;
  img: string;
  hero_image: string | null;
}

export interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submitted_at: string;
  status: 'new' | 'read';
  ref: string;
}
