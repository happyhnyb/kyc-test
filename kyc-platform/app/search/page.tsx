import Link from 'next/link';
import { searchPosts } from '@/lib/api';
import { timeAgo } from '@/lib/utils';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = '' } = await searchParams;
  const results = q ? await searchPosts(q) : [];

  return (
    <main className="container section">
      <h1 className="serif" style={{ fontSize: 34, marginBottom: 8 }}>Search</h1>
      <form action="/search">
        <input className="search-bar" name="q" defaultValue={q} placeholder="Search articles, tags, sectors..." />
      </form>
      <div className="helper" style={{ marginTop: 12 }}>{results.length} result(s)</div>
      <div className="grid" style={{ marginTop: 18 }}>
        {results.map((post) => (
          <Link key={post._id} href={`/post/${post.slug}`} className="card post-card">
            <span className="badge">{post.category} · {post.type}</span>
            <h2 className="post-title small">{post.title}</h2>
            <p className="muted">{post.excerpt}</p>
            <div className="meta"><span>{post.author}</span><span>{timeAgo(post.published_at)}</span></div>
          </Link>
        ))}
        {!results.length && q && <div className="card post-card">No results found.</div>}
      </div>
    </main>
  );
}
