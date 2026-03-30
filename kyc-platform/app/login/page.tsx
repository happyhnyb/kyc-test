import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { loginUser } from '@/lib/api';

async function doLogin(formData: FormData) {
  'use server';
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');
  const user = await loginUser(email, password);
  if (!user) return redirect('/login?error=1');
  const store = await cookies();
  store.set('kyc_session', JSON.stringify(user), { httpOnly: true, sameSite: 'lax', path: '/' });
  redirect('/');
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="form-wrap card">
      <h1 className="serif" style={{ fontSize: 34, marginTop: 0 }}>Sign in</h1>
      <p className="muted">The UI and session flow work now. Real auth provider can replace this later.</p>
      <form action={doLogin} className="form-grid">
        <input className="field" name="email" type="email" placeholder="admin@kyc.news" required />
        <input className="field" name="password" type="password" placeholder="admin123" required />
        <button className="btn primary" type="submit">Sign in</button>
      </form>
      {error && <div className="notice" style={{ marginTop: 14 }}>Invalid credentials.</div>}
      <div className="helper" style={{ marginTop: 14 }}>
        Demo accounts: admin@kyc.news / admin123 · reader@kyc.news / reader123 · free@kyc.news / free123
      </div>
    </main>
  );
}
