import { redirect } from 'next/navigation';
import { getAllPosts, getContacts, getUsers } from '@/lib/api';
import { getServerSessionUser } from '@/lib/session';
import { postsAdapter } from '@/lib/adapters';

async function createPost(formData: FormData) {
  'use server';
  const title = String(formData.get('title') || '');
  const excerpt = String(formData.get('excerpt') || '');
  const body = String(formData.get('body') || '');
  const category = String(formData.get('category') || 'Crops');
  const type = String(formData.get('type') || 'SHORT') as 'SHORT' | 'STORY' | 'ARTICLE';
  const tags = String(formData.get('tags') || '').split(',').map((t) => t.trim()).filter(Boolean);
  const isPremium = formData.get('is_premium') === 'on';
  const status = String(formData.get('status') || 'draft') as 'draft' | 'published';

  await postsAdapter.create({
    title,
    excerpt,
    body,
    category,
    type,
    tags,
    is_premium: isPremium,
    author: 'Dhairya Pareek',
    author_id: 'u1',
    status
  });

  redirect('/admin');
}

export default async function AdminPage() {
  const session = await getServerSessionUser();
  if (!session || !['admin', 'editor'].includes(session.role)) redirect('/login');

  const [posts, contacts, users] = await Promise.all([getAllPosts(), getContacts(), getUsers()]);

  return (
    <main className="admin-shell">
      <div className="admin-grid">
        <aside className="card sidebar">
          <h2 className="serif" style={{ marginTop: 0 }}>CMS</h2>
          <nav>
            <button className="nav-link">Published · {posts.filter((p) => p.status === 'published').length}</button>
            <button className="nav-link">Drafts · {posts.filter((p) => p.status === 'draft').length}</button>
            <button className="nav-link">Archived · {posts.filter((p) => p.status === 'archived').length}</button>
            <button className="nav-link">Users · {users.length}</button>
            <button className="nav-link">Inbox · {contacts.length}</button>
          </nav>
          <div className="helper" style={{ marginTop: 16 }}>Infra stays abstracted. Replace adapters with Mongo, R2, auth, search, payments later.</div>
        </aside>

        <section className="grid" style={{ gap: 18 }}>
          <div className="card admin-panel">
            <h2 className="serif" style={{ marginTop: 0 }}>Create Post</h2>
            <form action={createPost} className="editor-grid">
              <input className="field" name="title" placeholder="Title" required />
              <textarea className="textarea" name="excerpt" rows={2} placeholder="Excerpt" required />
              <textarea className="textarea" name="body" rows={10} placeholder="Body. Use ## for section headings." required />
              <div className="toolbar">
                <select className="select" name="category" defaultValue="Crops">
                  <option>Crops</option><option>Markets</option><option>AgriTech</option><option>Livestock</option><option>Policy</option><option>Climate</option><option>Trade</option><option>Research</option><option>Alerts</option>
                </select>
                <select className="select" name="type" defaultValue="SHORT">
                  <option value="SHORT">SHORT</option>
                  <option value="STORY">STORY</option>
                  <option value="ARTICLE">ARTICLE</option>
                </select>
                <select className="select" name="status" defaultValue="draft">
                  <option value="draft">Draft</option>
                  <option value="published">Publish</option>
                </select>
                <input className="field" name="tags" placeholder="tags, comma, separated" />
                <label className="nav-link"><input type="checkbox" name="is_premium" /> Premium</label>
              </div>
              <button className="btn primary" type="submit">Save</button>
            </form>
          </div>

          <div className="card admin-panel">
            <h2 className="serif" style={{ marginTop: 0 }}>Posts</h2>
            <table className="table">
              <thead><tr><th>Title</th><th>Type</th><th>Status</th><th>Views</th></tr></thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post._id}><td>{post.title}</td><td>{post.type}</td><td>{post.status}</td><td>{post.view_count.toLocaleString()}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card admin-panel">
            <h2 className="serif" style={{ marginTop: 0 }}>Users</h2>
            <table className="table">
              <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Plan</th></tr></thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}><td>{user.name}</td><td>{user.email}</td><td>{user.role}</td><td>{user.subscription.plan}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card admin-panel">
            <h2 className="serif" style={{ marginTop: 0 }}>Inbox</h2>
            <table className="table">
              <thead><tr><th>Ref</th><th>Name</th><th>Subject</th><th>Time</th></tr></thead>
              <tbody>
                {contacts.length ? contacts.map((contact) => (
                  <tr key={contact._id}><td>{contact.ref}</td><td>{contact.name}</td><td>{contact.subject}</td><td>{new Date(contact.submitted_at).toLocaleString('en-IN')}</td></tr>
                )) : <tr><td colSpan={4}>No submissions yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
