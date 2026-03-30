import { contactsAdapter } from '@/lib/adapters';

async function submitContact(formData: FormData) {
  'use server';
  const name = String(formData.get('name') || '');
  const email = String(formData.get('email') || '');
  const subject = String(formData.get('subject') || '');
  const message = String(formData.get('message') || '');
  if (!name || !email || !subject || message.length < 20) return;
  await contactsAdapter.create({ name, email, subject, message });
}

export default function ContactPage() {
  return (
    <main className="form-wrap card">
      <h1 className="serif" style={{ fontSize: 34, marginTop: 0 }}>Get in touch</h1>
      <p className="muted">Story tips, corrections, partnership inquiries.</p>
      <form action={submitContact} className="form-grid">
        <input className="field" name="name" placeholder="Your name" required />
        <input className="field" name="email" type="email" placeholder="you@example.com" required />
        <input className="field" name="subject" placeholder="Subject" required />
        <textarea className="textarea" name="message" rows={6} placeholder="Your message..." required minLength={20} />
        <button className="btn primary" type="submit">Send message</button>
        <div className="helper">Mock adapter currently stores contact submissions in memory. Swap with MongoDB/email plugins later.</div>
      </form>
    </main>
  );
}
