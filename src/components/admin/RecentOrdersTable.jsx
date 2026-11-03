import AdminPanel from "./AdminPanel";
import AdminTable from "./AdminTable";
import StatusBadge from "./StatusBadge";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "Asia/Phnom_Penh",
});

export default function RecentOrdersTable({ orders }) {
  const columns = [
    {
      key: "order",
      label: "Order",
      render: (order) => (
        <>
          <span className="admin-table__primary">{order.invoiceNumber}</span>
          <span className="admin-table__secondary">
            {dateFormatter.format(new Date(order.createdAt))}
          </span>
        </>
      ),
    },
    {
      key: "customer",
      label: "Customer",
      render: (order) => (order.customerId ? `Customer #${order.customerId}` : "Walk-in"),
    },
    {
      key: "status",
      label: "Status",
      render: (order) => <StatusBadge>{order.status}</StatusBadge>,
    },
    {
      key: "total",
      label: "Total",
      align: "right",
      render: (order) => <strong>{currencyFormatter.format(order.total)}</strong>,
    },
  ];

  return (
    <AdminPanel
      id="recent-orders-title"
      eyebrow="Latest activity"
      title="Recent orders"
    >
      <AdminTable
        caption="Five most recent orders"
        columns={columns}
        rows={orders}
        getRowKey={(order) => order.id}
        emptyMessage="No orders have been recorded yet."
      />
    </AdminPanel>
  );
}
