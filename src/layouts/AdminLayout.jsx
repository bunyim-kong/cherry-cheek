import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, FolderTree, ClipboardList, Store } from 'lucide-react';
import './AdminLayout.css';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: ShoppingBag },
  { to: '/admin/categories', label: 'Categories', icon: FolderTree },
  { to: '/admin/orders', label: 'Orders', icon: ClipboardList },
];

export default function AdminLayout() {
  return <div className="admin-shell">
    <aside className="admin-nav">
      <div className="admin-nav__brand"><span>C</span><div><strong>Cherry Cheeks</strong><small>Admin workspace</small></div></div>
      <nav aria-label="Admin navigation">{links.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => isActive ? 'active' : ''}><Icon size={18} />{label}</NavLink>)}</nav>
      <NavLink to="/" className="admin-nav__store"><Store size={18} /> View store</NavLink>
    </aside>
    <main className="admin-main"><Outlet /></main>
  </div>;
}
