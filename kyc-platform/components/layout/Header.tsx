import Link from 'next/link';
import type { SessionUser } from '@/types/user';

export function Header({ session }: { session: SessionUser | null }) {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo">
          <div className="logo-mark">kyc</div>
          <div>
            <div>Know Your Commodity</div>
            <div className="helper">India's commodity intelligence platform</div>
          </div>
        </Link>

        <nav className="nav-links">
          <Link className="nav-link" href="/search?q=monsoon">Search</Link>
          <Link className="nav-link" href="/about">About</Link>
          <Link className="nav-link" href="/contact">Contact</Link>
          {session && ['admin', 'editor'].includes(session.role) && (
            <Link className="nav-link" href="/admin">CMS</Link>
          )}
          {session ? (
            <span className="nav-link">{session.name.split(' ')[0]} · {session.role}</span>
          ) : (
            <>
              <Link className="nav-link" href="/login">Sign in</Link>
              <Link className="btn primary" href="/subscribe">Subscribe</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
