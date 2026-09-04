export function ArrowIcon({ direction = 'up-right' }: { direction?: 'up-right' | 'right' }) {
  return (
    <svg className="arrow-icon" viewBox="0 0 16 16" aria-hidden="true">
      {direction === 'right' ? (
        <path d="M2.5 8h10m-4-4 4 4-4 4" />
      ) : (
        <path d="M4 12 12 4m-6 0h6v6" />
      )}
    </svg>
  );
}
