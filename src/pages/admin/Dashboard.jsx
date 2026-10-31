import DashboardCard from "../../components/admin/DashboardCard";
import TopSellingProducts from "../../components/admin/TopSellingProducts";
import LowStockAlerts from "../../components/admin/LowStockAlerts";

import "./Dashboard.css";

function Dashboard() {
  return (
    <section className="dashboard-page">

      {/* Dashboard Statistic Cards */}
      <DashboardCard />

      {/* Product Performance */}
      <div className="dashboard-insights">
        <TopSellingProducts />
        <LowStockAlerts />
      </div>

    </section>
  );
}

export default Dashboard;