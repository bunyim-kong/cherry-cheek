import { Search } from "lucide-react";
import "./AdminSearch.css";

export default function AdminSearch({
  label = "Search",
  onChange,
  placeholder = "Search…",
  value,
}) {
  return (
    <label className="admin-search">
      <span className="admin-search__label">{label}</span>
      <Search size={17} aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}
