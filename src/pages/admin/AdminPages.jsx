import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Plus, RefreshCw, Search, Trash2, X } from 'lucide-react';
import { readStorage, writeStorage } from '../../service/storage';
import './AdminPages.css';

const keys = { products: 'cherry-cheeks-admin-products', categories: 'cherry-cheeks-admin-categories' };
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' });
const path = (file) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/student-data/${file}.json`;

function useAdminData(files) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setError('');
      try {
        const responses = await Promise.all(files.map((file) => fetch(path(file), { signal: controller.signal })));
        if (responses.some((response) => !response.ok)) throw new Error('Could not load data. Please try again.');
        const values = await Promise.all(responses.map((response) => response.json()));
        if (!values.every(Array.isArray)) throw new Error('Unexpected data format.');
        const result = Object.fromEntries(files.map((file, index) => [file, keys[file] ? readStorage(keys[file], values[index]) : values[index]]));
        setData(result);
      } catch (cause) { if (cause.name !== 'AbortError') setError(cause.message); }
    }
    load();
    return () => controller.abort();
  }, [files, revision]);
  return { data, error, refresh: () => setRevision((value) => value + 1), setData, setError };
}

const dashboardFiles = ['products', 'categories', 'invoices', 'accounts'];
const catalogFiles = ['products', 'categories'];
const orderFiles = ['invoices', 'accounts', 'products'];

function Heading({ eyebrow, title, description, onRefresh, action }) {
  return <header className="admin-heading"><div><small>{eyebrow}</small><h1>{title}</h1><p>{description}</p></div><div className="admin-heading__actions">{onRefresh && <button type="button" onClick={onRefresh}><RefreshCw size={16} /> Refresh</button>}{action}</div></header>;
}
function State({ data, error, refresh }) {
  if (error && !data) return <div className="admin-state" role="alert">{error} <button type="button" onClick={refresh}>Try again</button></div>;
  if (!data) return <div className="admin-state" role="status">Loading…</div>;
  return error ? <div className="admin-warning" role="status">Showing saved data. {error}</div> : null;
}
function Modal({ title, children, onClose, onSubmit, submitLabel, danger = false, disabled = false }) {
  return <div className="admin-modal" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><form className="admin-dialog" onSubmit={onSubmit}><header><h2>{title}</h2><button type="button" onClick={onClose} aria-label="Close"><X size={19} /></button></header><div className="admin-dialog__body">{children}</div><footer><button type="button" onClick={onClose}>Cancel</button><button type="submit" className={danger ? 'danger' : 'primary'} disabled={disabled}>{submitLabel}</button></footer></form></div>;
}

export function Dashboard() {
  const { data, error, refresh } = useAdminData(dashboardFiles);
  if (!data) return <State data={data} error={error} refresh={refresh} />;
  const paid = data.invoices.filter((item) => item.status === 'PAID');
  const revenue = paid.reduce((sum, item) => sum + item.total, 0);
  const sales = new Map();
  paid.forEach((item) => { const day = item.createdAt.slice(0, 10); sales.set(day, (sales.get(day) || 0) + item.total); });
  const days = [...sales].sort(([a], [b]) => a.localeCompare(b)).slice(-7);
  const max = Math.max(1, ...days.map(([, value]) => value));
  const low = data.products.filter((item) => item.active !== false && item.stockQuantity <= 12).sort((a, b) => a.stockQuantity - b.stockQuantity);
  const customers = new Map(data.accounts.map((item) => [item.id, item.fullName]));
  return <section className="admin-page"><Heading eyebrow="Overview" title="Dashboard" description="Sales and inventory at a glance." onRefresh={refresh} /><State data={data} error={error} refresh={refresh} />
    <div className="admin-metrics"><div><span>Revenue</span><strong>{money.format(revenue)}</strong></div><div><span>Paid orders</span><strong>{paid.length}</strong></div><div><span>Customers</span><strong>{data.accounts.filter((item) => item.role === 'CUSTOMER').length}</strong></div><div><span>Products</span><strong>{data.products.filter((item) => item.active !== false).length}</strong></div></div>
    <div className="admin-dashboard-grid"><article className="admin-card"><h2>Sales overview</h2><p>Revenue by sales day</p><div className="admin-chart">{days.map(([day, value]) => <div key={day} className="admin-chart__column"><span>{money.format(value)}</span><div style={{ height: `${value / max * 100}%` }} title={`${day}: ${money.format(value)}`} /><small>{day.slice(5)}</small></div>)}</div></article><article className="admin-card"><h2>Low stock</h2><p>12 units or fewer</p>{low.length ? low.map((item) => <div className="admin-stock" key={item.id}><img src={item.image} alt="" /><span>{item.name}</span><strong>{item.stockQuantity} left</strong></div>) : <p>All products are stocked.</p>}<Link to="/admin/products">View products</Link></article></div>
    <article className="admin-card"><div className="admin-card__title"><h2>Recent orders</h2><Link to="/admin/orders">View all</Link></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Status</th><th>Total</th></tr></thead><tbody>{[...data.invoices].sort((a,b) => new Date(b.createdAt)-new Date(a.createdAt)).slice(0,5).map((item) => <tr key={item.id}><td>{item.invoiceNumber}</td><td>{customers.get(item.customerId) || 'Walk-in customer'}</td><td>{date.format(new Date(item.createdAt))}</td><td>{item.status}</td><td>{money.format(item.total)}</td></tr>)}</tbody></table></div></article>
  </section>;
}

export function Products() {
  const { data, error, refresh, setData, setError } = useAdminData(catalogFiles);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [stock, setStock] = useState('all');
  const [sort, setSort] = useState('name');
  const [form, setForm] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const rows = useMemo(() => {
    if (!data) return [];
    return data.products.filter((item) => (category === 'all' || item.categoryId === Number(category)) && (stock === 'all' || (stock === 'low' ? item.stockQuantity <= 12 : item.stockQuantity > 12)) && `${item.name} ${item.sku}`.toLowerCase().includes(query.toLowerCase())).sort((a,b) => sort === 'stock' ? a.stockQuantity - b.stockQuantity : sort === 'price' ? b.price - a.price : a.name.localeCompare(b.name));
  }, [data, query, category, stock, sort]);
  function persist(next) { if (!writeStorage(keys.products, next)) { setError('Could not save changes in this browser.'); return false; } setData({ ...data, products: next }); setError(''); return true; }
  function save(event) { event.preventDefault(); const item = { ...form, id: form.id || Math.max(0, ...data.products.map((value) => value.id)) + 1, name: form.name.trim(), sku: form.sku.trim().toUpperCase(), categoryId: Number(form.categoryId), price: Number(form.price), stockQuantity: Number(form.stockQuantity), image: form.image.trim() }; if (!item.name || !item.sku) return; const next = form.id ? data.products.map((value) => value.id === form.id ? item : value) : [...data.products, item]; if (persist(next)) setForm(null); }
  function remove(event) { event.preventDefault(); if (persist(data.products.filter((item) => item.id !== deleting.id))) setDeleting(null); }
  return <section className="admin-page"><Heading eyebrow="Inventory" title="Products" description="Manage product details, pricing and stock." onRefresh={refresh} action={<button className="primary" onClick={() => setForm({ name:'', sku:'', categoryId:String(data?.categories[0]?.id || 1), price:'', stockQuantity:'', image:'', active:true })}><Plus size={16}/> Add product</button>} /><State data={data} error={error} refresh={refresh} />{data && <><div className="admin-metrics"><div><span>Products</span><strong>{data.products.length}</strong></div><div><span>Units in stock</span><strong>{data.products.reduce((sum,item)=>sum+item.stockQuantity,0)}</strong></div><div><span>Low stock</span><strong>{data.products.filter((item)=>item.stockQuantity>0 && item.stockQuantity<=12).length}</strong></div><div><span>Out of stock</span><strong>{data.products.filter((item)=>item.stockQuantity<=0).length}</strong></div></div><article className="admin-card"><div className="admin-filters"><label><Search size={16}/><input aria-label="Search products" placeholder="Search products or SKU" value={query} onChange={(event)=>setQuery(event.target.value)}/></label><select aria-label="Category" value={category} onChange={(event)=>setCategory(event.target.value)}><option value="all">All categories</option>{data.categories.map((item)=><option key={item.id} value={item.id}>{item.name}</option>)}</select><select aria-label="Stock" value={stock} onChange={(event)=>setStock(event.target.value)}><option value="all">All stock</option><option value="low">Low stock</option><option value="good">In stock</option></select><select aria-label="Sort" value={sort} onChange={(event)=>setSort(event.target.value)}><option value="name">Name</option><option value="stock">Lowest stock</option><option value="price">Highest price</option></select></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead><tbody>{rows.map((item)=><tr key={item.id}><td><div className="admin-product"><img src={item.image || '/images/products/101-gentle-face-cleanser.jpg'} alt=""/><span><strong>{item.name}</strong><small>{item.sku}</small></span></div></td><td>{data.categories.find((cat)=>cat.id===item.categoryId)?.name || 'Uncategorized'}</td><td>{money.format(item.price)}</td><td>{item.stockQuantity <= 12 ? <span className="admin-low">{item.stockQuantity} left</span> : item.stockQuantity}</td><td><div className="admin-row-actions"><button aria-label={`Edit ${item.name}`} onClick={()=>setForm({ ...item, categoryId:String(item.categoryId) })}><Pencil size={16}/></button><button aria-label={`Delete ${item.name}`} onClick={()=>setDeleting(item)}><Trash2 size={16}/></button></div></td></tr>)}</tbody></table>{!rows.length && <p className="admin-empty">No products found.</p>}</div><footer>{rows.length} of {data.products.length} products</footer></article></>}
    {form && <Modal title={form.id ? 'Edit product' : 'Add product'} onClose={()=>setForm(null)} onSubmit={save} submitLabel="Save product"><label>Name<input required value={form.name} onChange={(event)=>setForm({...form,name:event.target.value})}/></label><label>SKU<input required value={form.sku} onChange={(event)=>setForm({...form,sku:event.target.value})}/></label><label>Category<select value={form.categoryId} onChange={(event)=>setForm({...form,categoryId:event.target.value})}>{data.categories.map((item)=><option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label>Price<input required type="number" min="0" step="0.01" value={form.price} onChange={(event)=>setForm({...form,price:event.target.value})}/></label><label>Stock quantity<input required type="number" min="0" step="1" value={form.stockQuantity} onChange={(event)=>setForm({...form,stockQuantity:event.target.value})}/></label><label>Image path<input value={form.image} onChange={(event)=>setForm({...form,image:event.target.value})}/></label><label className="admin-check"><input type="checkbox" checked={form.active} onChange={(event)=>setForm({...form,active:event.target.checked})}/> Active product</label></Modal>}
    {deleting && <Modal title="Delete product?" onClose={()=>setDeleting(null)} onSubmit={remove} submitLabel="Delete product" danger><p>“{deleting.name}” will be removed from this browser’s product list.</p></Modal>}
  </section>;
}

export function Categories() {
  const { data, error, refresh, setData, setError } = useAdminData(catalogFiles);
  const [query, setQuery] = useState('');
  const [form, setForm] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const counts = useMemo(() => { const map = new Map(); data?.products.forEach((item)=>map.set(item.categoryId,(map.get(item.categoryId)||0)+1)); return map; }, [data]);
  function persist(next) { if (!writeStorage(keys.categories,next)) { setError('Could not save changes in this browser.'); return false; } setData({...data,categories:next}); setError(''); return true; }
  function save(event) { event.preventDefault(); const item = {...form,id:form.id || Math.max(0,...data.categories.map((value)=>value.id))+1,name:form.name.trim(),description:form.description.trim(),image:form.image.trim()}; if (!item.name) return; const next = form.id ? data.categories.map((value)=>value.id===form.id?item:value) : [...data.categories,item]; if (persist(next)) setForm(null); }
  function remove(event) { event.preventDefault(); if (counts.get(deleting.id)) return; if (persist(data.categories.filter((item)=>item.id!==deleting.id))) setDeleting(null); }
  return <section className="admin-page"><Heading eyebrow="Catalog" title="Categories" description="Organize products in your store." onRefresh={refresh} action={<button className="primary" onClick={()=>setForm({name:'',description:'',image:''})}><Plus size={16}/> Add category</button>}/><State data={data} error={error} refresh={refresh}/>{data && <><div className="admin-filters admin-category-filter"><label><Search size={16}/><input aria-label="Search categories" placeholder="Search categories" value={query} onChange={(event)=>setQuery(event.target.value)}/></label><span>{data.categories.length} categories · {data.products.length} products</span></div><div className="admin-category-grid">{data.categories.filter((item)=>`${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase())).map((item)=><article className="admin-category" key={item.id}><div className="admin-category__image">{item.image?<img src={item.image} alt=""/>:<span>No image</span>}</div><div className="admin-category__body"><div><h2>{item.name}</h2><div className="admin-row-actions"><button aria-label={`Edit ${item.name}`} onClick={()=>setForm({...item})}><Pencil size={16}/></button><button aria-label={`Delete ${item.name}`} onClick={()=>setDeleting(item)}><Trash2 size={16}/></button></div></div><p>{item.description || 'No description'}</p><small>{counts.get(item.id)||0} products</small></div></article>)}</div></>}
    {form && <Modal title={form.id?'Edit category':'Add category'} onClose={()=>setForm(null)} onSubmit={save} submitLabel="Save category"><label>Name<input required value={form.name} onChange={(event)=>setForm({...form,name:event.target.value})}/></label><label>Description<textarea rows="3" value={form.description} onChange={(event)=>setForm({...form,description:event.target.value})}/></label><label>Image path<input value={form.image} onChange={(event)=>setForm({...form,image:event.target.value})}/></label></Modal>}
    {deleting && <Modal title="Delete category?" onClose={()=>setDeleting(null)} onSubmit={remove} submitLabel="Delete category" danger disabled={Boolean(counts.get(deleting.id))}><p>{counts.get(deleting.id) ? `Move or delete the ${counts.get(deleting.id)} products in “${deleting.name}” first.` : `“${deleting.name}” will be removed from this browser.`}</p></Modal>}
  </section>;
}

export function Orders() {
  const { data, error, refresh } = useAdminData(orderFiles);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [selected, setSelected] = useState(null);
  const accounts = useMemo(()=>new Map(data?.accounts.map((item)=>[item.id,item.fullName])||[]),[data]);
  const products = useMemo(()=>new Map(data?.products.map((item)=>[item.id,item.name])||[]),[data]);
  if (!data) return <State data={data} error={error} refresh={refresh}/>;
  const paid = data.invoices.filter((item)=>item.status==='PAID');
  const rows = [...data.invoices].filter((item)=> (status==='all'||item.status===status) && `${item.invoiceNumber} ${accounts.get(item.customerId)||'Walk-in customer'}`.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  return <section className="admin-page"><Heading eyebrow="Sales" title="Orders" description="Review invoices, customers and payments." onRefresh={refresh}/><State data={data} error={error} refresh={refresh}/><div className="admin-metrics admin-metrics--three"><div><span>Total orders</span><strong>{data.invoices.length}</strong></div><div><span>Paid orders</span><strong>{paid.length}</strong></div><div><span>Revenue collected</span><strong>{money.format(paid.reduce((sum,item)=>sum+item.total,0))}</strong></div></div><article className="admin-card"><div className="admin-filters"><label><Search size={16}/><input aria-label="Search orders" placeholder="Search order or customer" value={query} onChange={(event)=>setQuery(event.target.value)}/></label><select aria-label="Status" value={status} onChange={(event)=>setStatus(event.target.value)}><option value="all">All statuses</option>{[...new Set(data.invoices.map((item)=>item.status))].map((item)=><option key={item}>{item}</option>)}</select></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Items</th><th>Status</th><th>Payment</th><th>Total</th><th>Details</th></tr></thead><tbody>{rows.map((item)=><tr key={item.id}><td><strong>{item.invoiceNumber}</strong></td><td>{accounts.get(item.customerId)||'Walk-in customer'}</td><td>{date.format(new Date(item.createdAt))}</td><td>{item.items.reduce((sum,line)=>sum+line.quantity,0)}</td><td><span className="admin-paid">{item.status}</span></td><td>{item.payments.map((payment)=>payment.method).join(', ')||'—'}</td><td>{money.format(item.total)}</td><td><button onClick={()=>setSelected(item)}>View</button></td></tr>)}</tbody></table>{!rows.length&&<p className="admin-empty">No orders found.</p>}</div><footer>{rows.length} of {data.invoices.length} orders</footer></article>
    {selected && <Modal title={selected.invoiceNumber} onClose={()=>setSelected(null)} onSubmit={(event)=>{event.preventDefault();setSelected(null);}} submitLabel="Close"><p><strong>Customer:</strong> {accounts.get(selected.customerId)||'Walk-in customer'}</p><p><strong>Date:</strong> {date.format(new Date(selected.createdAt))}</p><p><strong>Cashier:</strong> {accounts.get(selected.cashierId)||'—'}</p><p><strong>Status:</strong> {selected.status}</p><h3>Items</h3>{selected.items.map((item)=><div className="admin-detail-row" key={item.productId}><span>{products.get(item.productId)||`Product #${item.productId}`}<small>{item.quantity} × {money.format(item.unitPrice)}</small></span><strong>{money.format(item.lineTotal)}</strong></div>)}<div className="admin-detail-row"><span>Subtotal</span><span>{money.format(selected.subtotal)}</span></div><div className="admin-detail-row"><span>Discount</span><span>−{money.format(selected.discount)}</span></div><div className="admin-detail-row"><span>Tax</span><span>{money.format(selected.tax)}</span></div><div className="admin-detail-row"><strong>Total</strong><strong>{money.format(selected.total)}</strong></div><h3>Payment</h3>{selected.payments.map((item,index)=><p key={index}>{item.method} · {money.format(item.amount)}{item.reference?` · ${item.reference}`:''}</p>)}</Modal>}
  </section>;
}
