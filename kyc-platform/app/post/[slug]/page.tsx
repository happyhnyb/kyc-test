import { notFound } from 'next/navigation';
import { Article } from '@/components/post/Article';
import { getPost } from '@/lib/api';
import { getServerSessionUser } from '@/lib/session';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const session = await getServerSessionUser();
  const canRead = !post.is_premium || !!session && ['admin', 'editor', 'premium'].includes(session.role);

  return <Article post={post} canRead={canRead} />;
}
