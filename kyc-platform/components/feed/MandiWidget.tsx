import { MANDI_PRICES } from '@/mocks/data';

export function MandiWidget() {
  return (
    <div className="card post-card">
      <h3 className="post-title small">Today's Mandi Prices</h3>
      <div className="grid">
        {MANDI_PRICES.map((item) => (
          <div key={item.crop} className="meta" style={{ justifyContent: 'space-between' }}>
            <span>{item.crop}</span>
            <span style={{ color: item.up ? 'var(--green)' : 'var(--red)' }}>{item.price} · {item.change}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
