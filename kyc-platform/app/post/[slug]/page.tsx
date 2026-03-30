import { notFound } from 'next/navigation';
import Article from '@/components/post/Article';
import { getAllPosts, getPost } from '@/lib/api';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) notFound();

  // GitHub Pages is static hosting; server-side sessions won't work.
  // Keep premium content protected by default.
  const canRead = !post.is_premium;

  return <Article post={post} canRead={canRead} />;
}
