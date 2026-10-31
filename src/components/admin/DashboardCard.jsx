import {
  ChartNoAxesColumnIncreasing,
  ShoppingCart,
  Package,
  DollarSign,
} from "lucide-react";
import "./DashboardCard.css";
import "../../styles/main.css";

function DashboardCard() {
  const dashboardCards = [
    {
      id: 1,
      title: "TOTAL REVENUE",
      value: "$ 3.46M",
      description: "Total sales revenue",
      icon: ChartNoAxesColumnIncreasing,
    },
    {
      id:2,
      title: "TOTAL ORDERS",
      value: "100",
      description: "Total number of orders",
      icon: ShoppingCart,
    },
    {
      id: 3,
      title: "QUANITITY",
      value: "200",
      description: "Total item sold",
      icon:  Package,
    },
    {
      id: 4,
      title: "AVERAGE ORDER",
      value: "$1.75K",
      description: "Average order value",
      icon: DollarSign,
    }
  ];

  return (
    <section className="admin-dashboard">
      <div className="admin-dashboard-cards">
        {dashboardCards.map((card) => {
          const Icon = card.icon;

          return (
            <div className="admin-dashboard_card" key={card.id}>
              {/* Left Icon */}
              <div className="dashboard-card-icon">
                <Icon size={25} strokeWidth={2} />
              </div>

              {/* Right Content */}
              <div className="dashboard-card-content">
                <h3 className="card-title">{card.title}</h3>

                <h2 className="card-value">{card.value}</h2>

                <p className="card-description">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default DashboardCard;