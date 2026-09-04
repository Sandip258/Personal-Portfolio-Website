interface StatusBarProps { items: string[] }

export function StatusBar({ items }: StatusBarProps) {
  return (
    <div className="shell">
      <div className="status-bar" aria-label="Portfolio status">
        {items.map((item, index) => (
          <span key={item} className={index === 0 ? 'status-bar__online' : undefined}>{item}</span>
        ))}
      </div>
    </div>
  );
}
