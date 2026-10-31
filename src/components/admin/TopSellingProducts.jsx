import { Trophy, Package } from "lucide-react";
import "./TopSellingProducts.css";

function TopSellingProducts() {
  const products = [
    {
      id: 1,
      name: "Cloud Milk Toner",
      category: "Skincare",
      sold: 245,
      revenue: 6125,
    },
    {
      id: 2,
      name: "Dew Reset Cleanser",
      category: "Cleanser",
      sold: 180,
      revenue: 4320,
    },
    {
      id: 3,
      name: "Rose Glow Serum",
      category: "Serum",
      sold: 150,
      revenue: 5250,
    },
    {
      id: 4,
      name: "Hydrating Moisturizer",
      category: "Moisturizer",
      sold: 120,
      revenue: 3600,
    },
  ];

  // Sort products from highest to lowest sales
  const topProducts = [...products].sort(
    (a, b) => b.sold - a.sold
  );

  const maxSold = topProducts[0]?.sold || 1;

  return (
    <section className="top-selling-products">
      {/* Header */}
      <div className="dashboard-widget-header">
        <div>
          <p className="dashboard-widget-subtitle">
            PRODUCT PERFORMANCE
          </p>

          <h2>
            <Trophy size={20} />
            Top-Selling Products
          </h2>

          <p className="dashboard-widget-description">
            Your most popular products
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="top-products-list">
        {topProducts.map((product, index) => (
          <div className="top-product-item" key={product.id}>

            {/* Product Icon */}
            <div className="top-product-icon">
              <Package size={22} />
            </div>

            {/* Product Information */}
            <div className="top-product-info">
              <div className="top-product-heading">
                <h3>{product.name}</h3>

                <span className="top-product-rank">
                  #{index + 1}
                </span>
              </div>

              <p>{product.category}</p>

              {/* Sales Progress Bar */}
              <div className="top-product-progress">
                <div
                  className="top-product-progress-fill"
                  style={{
                    width: `${(product.sold / maxSold) * 100}%`,
                  }}
                />
              </div>

              <div className="top-product-details">
                <span>{product.sold} sold</span>

                <strong>
                  ${product.revenue.toLocaleString()}
                </strong>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

export default TopSellingProducts;