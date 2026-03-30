import { postsAdapter } from '@/lib/adapters';

export async function GET() {
  const posts = await postsAdapter.listPublished();
  return Response.json(posts);
}
