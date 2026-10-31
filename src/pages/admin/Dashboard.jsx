import { useEffect, useMemo, useState } from "react";
import {
  CircleDollarSign,
  PackageSearch,
  ReceiptText,
  ShoppingBag,
} from "lucide-react";
import AdminStatCard from "../../components/admin/AdminStatCard";
import RecentOrdersTable from "../../components/admin/RecentOrdersTable";
import "./Dashboard.css";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function Dashboard() {
  const [data, setData] = useState({ invoices: [], products: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadDashboardData() {
      try {
        const [invoiceResponse, productResponse] = await Promise.all([
          fetch("/student-data/invoices.json", { signal: controller.signal }),
          fetch("/student-data/products.json", { signal: controller.signal }),
        ]);

        if (!invoiceResponse.ok || !productResponse.ok) {
          throw new Error("Unable to load dashboard data.");
        }

        const [invoices, products] = await Promise.all([
          invoiceResponse.json(),
          productResponse.json(),
        ]);

        setData({ invoices, products });
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          setError(loadError.message || "Unable to load dashboard data.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadDashboardData();
    return () => controller.abort();
  }, []);

  const dashboard = useMemo(() => {
    const paidInvoices = data.invoices.filter((invoice) => invoice.status === "PAID");
    const revenue = paidInvoices.reduce((total, invoice) => total + invoice.total, 0);
    const itemsSold = paidInvoices.reduce(
      (total, invoice) => total + invoice.items.reduce(
        (itemTotal, item) => itemTotal + item.quantity,
        0,
      ),
      0,
    );
    const lowStock = data.products.filter(
      (product) => product.active && product.stockQuantity <= 15,
    ).length;
    const recentOrders = [...data.invoices]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    return {
      itemsSold,
      lowStock,
      orderCount: paidInvoices.length,
      recentOrders,
      revenue,
    };
  }, [data]);

  const statCards = [
    {
      label: "Total revenue",
      value: currencyFormatter.format(dashboard.revenue),
      helper: "From paid orders",
      icon: CircleDollarSign,
      tone: "featured",
    },
    {
      label: "Orders",
      value: dashboard.orderCount,
      helper: "Paid orders",
      icon: ReceiptText,
      tone: "rose",
    },
    {
      label: "Items sold",
      value: dashboard.itemsSold,
      helper: "Units across all orders",
      icon: ShoppingBag,
      tone: "plum",
    },
    {
      label: "Low stock",
      value: dashboard.lowStock,
      helper: "15 units or fewer",
      icon: PackageSearch,
      tone: "warning",
    },
  ];

  return (
    <section className="dashboard-page">
      {error && <p className="dashboard-message dashboard-message--error" role="alert">{error}</p>}

      {isLoading ? (
        <div className="dashboard-loading" role="status">
          <span className="dashboard-loading__dot" aria-hidden="true" />
          Loading dashboard…
        </div>
      ) : !error && (
        <>
          <section className="dashboard-stats" aria-label="Store statistics">
            <div className="dashboard-stats__grid">
              {statCards.map((card) => (
                <AdminStatCard key={card.label} {...card} />
              ))}
            </div>
          </section>
          <RecentOrdersTable
            orders={dashboard.recentOrders}
          />
        </>
      )}
    </section>
  );
}

export default Dashboard;
