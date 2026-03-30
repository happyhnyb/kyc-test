import { PLANS } from '@/mocks/data';
import { getServerSessionUser } from '@/lib/session';

export default async function SubscribePage() {
  const session = await getServerSessionUser();

  return (
    <main className="container section">
      <h1 className="serif" style={{ fontSize: 38 }}>Subscribe to KYC Pro</h1>
      <p className="muted">Frontend complete. Razorpay or Stripe can be plugged in later using the payments adapter.</p>
      <div className="plan-grid" style={{ marginTop: 20 }}>
        {PLANS.map((plan) => (
          <div key={plan.id} className={`card plan ${plan.featured ? 'featured' : ''}`}>
            <div className="badge">{plan.name}</div>
            <div className="serif" style={{ fontSize: 36 }}>{plan.price}<span className="helper">{plan.period}</span></div>
            <div className="grid">
              {plan.features.map((feature) => <div key={feature}>✓ {feature}</div>)}
            </div>
            <button className="btn primary">{session?.subscription?.plan === plan.id ? 'Current Plan' : 'Connect payment infra later'}</button>
          </div>
        ))}
      </div>
    </main>
  );
}
