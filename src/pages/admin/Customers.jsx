import { useEffect, useMemo, useState } from "react";
import AdminPageState from "../../components/admin/AdminPageState";
import AdminPanel from "../../components/admin/AdminPanel";
import AdminSearch from "../../components/admin/AdminSearch";
import AdminTable from "../../components/admin/AdminTable";
import StatusBadge from "../../components/admin/StatusBadge";
import "./Customers.css";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export default function Customers() {
  const [data, setData] = useState({ accounts: [], invoices: [] });
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadCustomers() {
      try {
        const [accountResponse, invoiceResponse] = await Promise.all([
          fetch("/student-data/accounts.json", { signal: controller.signal }),
          fetch("/student-data/invoices.json", { signal: controller.signal }),
        ]);

        if (!accountResponse.ok || !invoiceResponse.ok) {
          throw new Error("Unable to load customers.");
        }

        const [accounts, invoices] = await Promise.all([
          accountResponse.json(),
          invoiceResponse.json(),
        ]);

        setData({
          accounts: Array.isArray(accounts) ? accounts : [],
          invoices: Array.isArray(invoices) ? invoices : [],
        });
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          setError(loadError.message || "Unable to load customers.");
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadCustomers();
    return () => controller.abort();
  }, []);

  const customers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return data.accounts
      .filter((account) => account.role === "CUSTOMER")
      .map((customer) => {
        const orders = data.invoices.filter((invoice) => invoice.customerId === customer.id);
        const latestOrder = [...orders].sort(
          (first, second) => new Date(second.createdAt) - new Date(first.createdAt),
        )[0];

        return {
          ...customer,
          orderCount: orders.length,
          totalSpent: orders.reduce((total, order) => total + order.total, 0),
          latestOrder: latestOrder?.createdAt || null,
        };
      })
      .filter((customer) => (
        !query || `${customer.fullName} ${customer.email}`.toLowerCase().includes(query)
      ));
  }, [data, search]);

  const columns = [
    {
      key: "customer",
      label: "Customer",
      render: (customer) => (
        <div className="admin-customers__customer">
          <div>
            <span className="admin-table__primary">{customer.fullName}</span>
            <span className="admin-table__secondary">{customer.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: "orders",
      label: "Orders",
      align: "right",
      render: (customer) => (
        <span className="admin-customers__number">{customer.orderCount}</span>
      ),
    },
    {
      key: "spent",
      label: "Total spent",
      align: "right",
      render: (customer) => (
        <span className="admin-customers__number">
          {currencyFormatter.format(customer.totalSpent)}
        </span>
      ),
    },
    {
      key: "lastOrder",
      label: "Last order",
      render: (customer) => (
        customer.latestOrder ? dateFormatter.format(new Date(customer.latestOrder)) : "No orders yet"
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (customer) => (
        <StatusBadge tone={customer.active ? "active" : "inactive"}>
          {customer.active ? "Active" : "Inactive"}
        </StatusBadge>
      ),
    },
  ];

  if (isLoading) return <AdminPageState>Loading customers…</AdminPageState>;
  if (error) return <AdminPageState error>{error} Please refresh to try again.</AdminPageState>;

  return (
    <section className="admin-customers">
      <AdminPanel
        id="customers-list-title"
        eyebrow="Community"
        title="Customers"
        action={(
          <AdminSearch
            label="Search customers"
            placeholder="Search name or email"
            value={search}
            onChange={setSearch}
          />
        )}
      >
        <AdminTable
          caption="Customer accounts"
          columns={columns}
          rows={customers}
          getRowKey={(customer) => customer.id}
          minWidth="760px"
          emptyMessage={search ? "No customers match your search." : "No customers found."}
        />
      </AdminPanel>
    </section>
  );
}
