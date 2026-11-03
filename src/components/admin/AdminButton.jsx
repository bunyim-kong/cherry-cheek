import "./AdminButton.css";

export default function AdminButton({
  children,
  className = "",
  iconOnly = false,
  variant = "secondary",
  ...buttonProps
}) {
  return (
    <button
      className={`admin-button admin-button--${variant}${iconOnly ? " admin-button--icon" : ""} ${className}`.trim()}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
