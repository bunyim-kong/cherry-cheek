import "./AdminStatCard.css";

export default function AdminStatCard({
  helper,
  icon: Icon,
  label,
  tone = "default",
  value,
}) {
  return (
    <article className={`admin-stat-card admin-stat-card--${tone}`}>
      <div className="admin-stat-card__content">
        <h2 className="admin-stat-card__label">{label}</h2>
        <p className="admin-stat-card__value">{value}</p>
        <p className="admin-stat-card__helper">{helper}</p>
      </div>
      <div className="admin-stat-card__icon" aria-hidden="true">
        <Icon />
      </div>
    </article>
  );
}
