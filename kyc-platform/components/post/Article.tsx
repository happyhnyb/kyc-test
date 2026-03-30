import type { Post } from '@/types/post';
import { fmtDate } from '@/lib/utils';
import { PostThumb } from '@/components/feed/PostThumb';

export function Article({ post, canRead = true }: { post: Post; canRead?: boolean }) {
  const bodyParts = post.body.split('\n\n');
  const teaserLen = Math.floor(post.body.length * 0.25);

  return (
    <div className="article-shell">
      <article className="card article">
        <span className="badge">{post.category}</span>
        <h1>{post.title}</h1>
        <p className="muted" style={{ fontSize: 18 }}>{post.excerpt}</p>
        <div className="meta"><span>{post.author}</span><span>{fmtDate(post.published_at)}</span><span>{post.view_count.toLocaleString()} reads</span>{post.is_premium && <span className="badge pro">Pro</span>}</div>
        <div style={{ margin: '22px 0' }}><PostThumb label={post.img} /></div>

        {canRead ? (
          <div>
            {bodyParts.map((part, i) => (
              part.startsWith('## ') ? <h2 key={i}>{part.replace('## ', '')}</h2> : <p key={i}>{part}</p>
            ))}
          </div>
        ) : (
          <div>
            <div>
              {post.body.slice(0, teaserLen).split('\n\n').map((part, i) => <p key={i}>{part}</p>)}
            </div>
            <div className="notice" style={{ marginTop: 24 }}>
              <strong>This story is for KYC Pro subscribers.</strong>
              <div className="helper" style={{ marginTop: 6 }}>The UI is complete. Payment + infra plugins can be wired later without rebuilding the app.</div>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
