import { useEffect, useMemo, useState } from "react";
import AdminPageState from "../../components/admin/AdminPageState";
import AdminPanel from "../../components/admin/AdminPanel";
import AdminSearch from "../../components/admin/AdminSearch";
import AdminTable from "../../components/admin/AdminTable";
import StatusBadge from "../../components/admin/StatusBadge";
import "./Orders.css";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export default function Orders() {
  const [data, setData] = useState({ accounts: [], invoices: [] });
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadOrders() {
      try {
        const [invoiceResponse, accountResponse] = await Promise.all([
          fetch("/student-data/invoices.json", { signal: controller.signal }),
          fetch("/student-data/accounts.json", { signal: controller.signal }),
        ]);

        if (!invoiceResponse.ok || !accountResponse.ok) {
          throw new Error("Unable to load orders.");
        }

        const [invoices, accounts] = await Promise.all([
          invoiceResponse.json(),
          accountResponse.json(),
        ]);

        setData({
          invoices: Array.isArray(invoices) ? invoices : [],
          accounts: Array.isArray(accounts) ? accounts : [],
        });
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          setError(loadError.message || "Unable to load orders.");
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadOrders();
    return () => controller.abort();
  }, []);

  const customerNames = useMemo(
    () => new Map(data.accounts.map((account) => [account.id, account.fullName])),
    [data.accounts],
  );

  const orders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return [...data.invoices]
      .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt))
      .filter((order) => {
        const customer = customerNames.get(order.customerId) || "Walk-in customer";
        const payment = order.payments[0]?.method || "Unpaid";
        return !query || `${order.invoiceNumber} ${customer} ${payment}`.toLowerCase().includes(query);
      });
  }, [customerNames, data.invoices, search]);

  const columns = [
    {
      key: "order",
      label: "Order",
      render: (order) => (
        <div>
          <span className="admin-table__primary">{order.invoiceNumber}</span>
          <span className="admin-table__secondary">{dateFormatter.format(new Date(order.createdAt))}</span>
        </div>
      ),
    },
    {
      key: "customer",
      label: "Customer",
      render: (order) => customerNames.get(order.customerId) || "Walk-in customer",
    },
    {
      key: "items",
      label: "Items",
      align: "right",
      render: (order) => (
        <span className="admin-orders__number">
          {order.items.reduce((total, item) => total + item.quantity, 0)}
        </span>
      ),
    },
    {
      key: "payment",
      label: "Payment",
      render: (order) => order.payments[0]?.method || "—",
    },
    {
      key: "total",
      label: "Total",
      align: "right",
      render: (order) => (
        <span className="admin-orders__number">{currencyFormatter.format(order.total)}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (order) => <StatusBadge tone={order.status}>{order.status}</StatusBadge>,
    },
  ];

  if (isLoading) return <AdminPageState>Loading orders…</AdminPageState>;
  if (error) return <AdminPageState error>{error} Please refresh to try again.</AdminPageState>;

  return (
    <section className="admin-orders">
      <AdminPanel
        id="orders-list-title"
        eyebrow="Sales"
        title="All orders"
        action={(
          <AdminSearch
            label="Search orders"
            placeholder="Search order or customer"
            value={search}
            onChange={setSearch}
          />
        )}
      >
        <AdminTable
          caption="Store orders"
          columns={columns}
          rows={orders}
          getRowKey={(order) => order.id}
          minWidth="820px"
          emptyMessage={search ? "No orders match your search." : "No orders found."}
        />
      </AdminPanel>
    </section>
  );
}
