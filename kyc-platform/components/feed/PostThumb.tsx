const icons: Record<string, string> = {
  crops: '🌾', agritech: '🛰️', dairy: '🐄', wheat: '🌿', organic: '🌱', locust: '🦗', water: '💧', tomato: '🍅', fpo: '🤝', research: '🔬'
};

export function PostThumb({ label }: { label: string }) {
  return <div className="thumb">{icons[label] ?? '📰'}</div>;
}
