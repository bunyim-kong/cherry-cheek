import "./StatusBadge.css";

export default function StatusBadge({ children, tone }) {
  const resolvedTone = (tone || String(children)).toLowerCase().replaceAll(" ", "-");

  return (
    <span className={`admin-status-badge admin-status-badge--${resolvedTone}`}>
      {children}
    </span>
  );
}
