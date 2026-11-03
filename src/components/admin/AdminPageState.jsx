import "./AdminPageState.css";

export default function AdminPageState({ children, error = false }) {
  return (
    <div
      className={`admin-page-state${error ? " admin-page-state--error" : ""}`}
      role={error ? "alert" : "status"}
    >
      {!error && <span className="admin-page-state__dot" aria-hidden="true" />}
      {children}
    </div>
  );
}
