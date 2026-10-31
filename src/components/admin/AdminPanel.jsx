import "./AdminPanel.css";

export default function AdminPanel({ action, children, className = "", eyebrow, id, title }) {
  return (
    <section className={`admin-panel ${className}`.trim()} aria-labelledby={id}>
      <header className="admin-panel__header">
        <div>
          {eyebrow && <p className="admin-panel__eyebrow">{eyebrow}</p>}
          <h2 className="admin-panel__title" id={id}>{title}</h2>
        </div>
        {action}
      </header>
      <div className="admin-panel__body">{children}</div>
    </section>
  );
}
