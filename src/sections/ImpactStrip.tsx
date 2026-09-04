interface Impact { value: string; label: string }

export function ImpactStrip({ impacts }: { impacts: Impact[] }) {
  return (
    <section className="shell impact" aria-labelledby="impact-label">
      <p id="impact-label" className="sr-only">Selected six-month portfolio outcomes</p>
      <div className="impact__grid">
        {impacts.map((item) => (
          <div className="impact__item" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
