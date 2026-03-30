import Link from 'next/link';
import type { Post } from '@/types/post';
import { timeAgo } from '@/lib/utils';
import { PostThumb } from './PostThumb';
import { MandiWidget } from './MandiWidget';

export default function Feed({ posts }: { posts: Post[] }) {
  const hero = posts[0];
  const side = posts.slice(1, 4);
  const latest = posts.slice(0, 6);
  const analysis = posts.filter((p) => p.type !== 'SHORT').slice(0, 3);
  const mostRead = [...posts].sort((a, b) => b.view_count - a.view_count).slice(0, 5);

  if (!hero) return null;

  return (
    <main className="container">
      <section className="hero">
        <Link href={`/post/${hero.slug}`} className="card post-card hero-main">
          <PostThumb label={hero.img} />
          <span className="badge">{hero.category}</span>
          <h1 className="post-title">{hero.title}</h1>
          <p className="muted">{hero.excerpt}</p>
          <div className="meta">
            <span>{hero.author}</span>
            <span>{timeAgo(hero.published_at)}</span>
            {hero.is_premium && <span className="badge pro">Pro</span>}
          </div>
        </Link>
        <div className="hero-side">
          {side.map((post) => (
            <Link key={post._id} href={`/post/${post.slug}`} className="card post-card">
              <span className="badge">{post.category}</span>
              <h2 className="post-title small">{post.title}</h2>
              <p className="muted">{post.excerpt}</p>
              <div className="meta"><span>{post.author}</span><span>{timeAgo(post.published_at)}</span>{post.is_premium && <span className="badge pro">Pro</span>}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title"><h2>Latest</h2><span className="helper">Production-ready UI, infra adapters pending</span></div>
        <div className="grid-three">
          {latest.map((post) => (
            <Link key={post._id} href={`/post/${post.slug}`} className="card post-card">
              <PostThumb label={post.img} />
              <span className="badge">{post.category}</span>
              <h3 className="post-title small">{post.title}</h3>
              <p className="muted">{post.excerpt}</p>
              <div className="meta"><span>{post.author}</span><span>{timeAgo(post.published_at)}</span>{post.is_premium && <span className="badge pro">Pro</span>}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" style={{ display: 'grid', gridTemplateColumns: '1.4fr .9fr', gap: 18 }}>
        <div>
          <div className="section-title"><h2>Analysis & Deep Dives</h2></div>
          <div className="grid">
            {analysis.map((post) => (
              <Link key={post._id} href={`/post/${post.slug}`} className="card post-card">
                <span className="badge">{post.category}</span>
                <h3 className="post-title small">{post.title}</h3>
                <p className="muted">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="section-title"><h2>Most Read</h2></div>
          <div className="grid">
            {mostRead.map((post, i) => (
              <Link key={post._id} href={`/post/${post.slug}`} className="card post-card">
                <div className="meta"><strong>{String(i + 1).padStart(2, '0')}</strong> <span>{post.view_count.toLocaleString()} reads</span></div>
                <h3 className="post-title small">{post.title}</h3>
              </Link>
            ))}
            <MandiWidget />
          </div>
        </div>
      </section>
    </main>
  );
}
