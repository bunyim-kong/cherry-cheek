import Button from './Button';
import "./ProductCard.css";
import productImage from "../assets/cloud-milk-toner.jpg";

const defaultProduct = {
  brand: "Cherry Cheeks",
  name: "Cloud Milk Toner",
  price: "$25.00",
  stockQuantity: 0,
  isNew: true,
  image: productImage,
};

function formatPrice(value) {
  return typeof value === 'number' ? `$${value.toFixed(2)}` : value;
}

function ProductCard({ product = {}, oldPrice, onAddToBag }) {
  const item = {
    ...defaultProduct,
    ...product,
    oldPrice: product.oldPrice ?? oldPrice,
  };
  const badge = item.badge ?? (item.isNew ? 'NEW' : null);
  const inStock = item.stockQuantity > 0;

  return (
    <article className="product-card">
      <div className="product-image">
        <img src={item.image} alt={item.name} />

        {badge && <span className="new-badge">{badge}</span>}

        <Button
          className="add-to-bag"
          size="compact"
          aria-label={`Add ${item.name} to bag`}
          onClick={onAddToBag}
          disabled={!inStock}
        >
          {inStock ? 'Add to bag' : 'Out of stock'}
        </Button>
      </div>

      <div className="product-info">
        <p className="category">{item.brand}</p>
        <h3 className="product-name">{item.name}</h3>
        <div className="product-meta">
          <p className="quantity">
            <span>Stock:</span>
            <span className="quantity-value">{item.stockQuantity}</span>
          </p>
          <p className="price-line">
            <span className="price">{formatPrice(item.price)}</span>
          </p>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
