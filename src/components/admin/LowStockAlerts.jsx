import {
  AlertTriangle,
  PackageX,
  Package,
} from "lucide-react";

import "./LowStockAlerts.css";

function LowStockAlerts() {
  const products = [
    {
      id: 1,
      name: "Dew Reset Cleanser",
      category: "Cleanser",
      stock: 3,
    },
    {
      id: 2,
      name: "Rose Glow Serum",
      category: "Serum",
      stock: 7,
    },
    {
      id: 3,
      name: "Cherry Lip Balm",
      category: "Lip Care",
      stock: 0,
    },
    {
      id: 4,
      name: "Cloud Milk Toner",
      category: "Skincare",
      stock: 9,
    },
  ];

  // Products with fewer than 10 items
  const lowStockProducts = products
    .filter((product) => product.stock < 10)
    .sort((a, b) => a.stock - b.stock);

  // Determine stock status
  function getStockStatus(stock) {
    if (stock === 0) {
      return {
        label: "Out of Stock",
        className: "out-of-stock",
      };
    }

    if (stock <= 5) {
      return {
        label: "Critical",
        className: "critical",
      };
    }

    return {
      label: "Low Stock",
      className: "low-stock",
    };
  }

  return (
    <section className="low-stock-alerts">

      {/* Header */}
      <div className="dashboard-widget-header">
        <div>
          <p className="dashboard-widget-subtitle">
            INVENTORY MANAGEMENT
          </p>

          <h2>
            <AlertTriangle size={20} />
            Low Stock Alerts
          </h2>

          <p className="dashboard-widget-description">
            Products that need restocking
          </p>
        </div>

        {/* Alert Count */}
        <span className="stock-alert-count">
          {lowStockProducts.length}
        </span>
      </div>

      {/* Product List */}
      <div className="low-stock-list">
        {lowStockProducts.length === 0 ? (
          <p className="stock-empty">
            All products have sufficient stock.
          </p>
        ) : (
          lowStockProducts.map((product) => {
            const status = getStockStatus(product.stock);

            return (
              <div className="low-stock-item" key={product.id}>

                {/* Product Icon */}
                <div className="low-stock-icon">
                  {product.stock === 0 ? (
                    <PackageX size={22} />
                  ) : (
                    <Package size={22} />
                  )}
                </div>

                {/* Product Info */}
                <div className="low-stock-info">
                  <h3>{product.name}</h3>

                  <p>{product.category}</p>

                  <span className="stock-remaining">
                    {product.stock} units remaining
                  </span>
                </div>

                {/* Status Badge */}
                <span
                  className={`stock-status ${status.className}`}
                >
                  {status.label}
                </span>

              </div>
            );
          })
        )}
      </div>

    </section>
  );
}

export default LowStockAlerts;