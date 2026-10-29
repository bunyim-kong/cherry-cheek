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

function ProductCard({ product = {}, onAddToBag }) {
  const {
    name,
    brand,
    price,
    stockQuantity,
    image,
    badge,
    isNew,
  } = {
    ...defaultProduct,
    ...product,
  };

  const badgeLabel = badge ?? (isNew ? 'NEW' : null);
  const inStock = stockQuantity > 0;

  const badgeLabel = badge ?? (isNew ? 'NEW' : null);
  const inStock = stockQuantity > 0;

  return (
    <article className="product-card">
      <div className="product-image">
        <img src={image} alt={name} loading="lazy" />

        {badgeLabel && <span className="new-badge">{badgeLabel}</span>}

        <Button
          className="add-to-bag"
          size="compact"
          aria-label={`Add ${name} to bag`}
          onClick={onAddToBag}
          disabled={!inStock}
        >
          {inStock ? 'Add to bag' : 'Out of stock'}
        </Button>
      </div>

      <div className="product-info">
        <p className="category">{brand}</p>
        <h3 className="product-name">{name}</h3>
        <div className="product-meta">
          <p className="quantity">
            <span>Stock:</span>
            <span className="quantity-value">{stockQuantity}</span>
          </p>
          <p className="price-line">
            <span className="price">{formatPrice(price)}</span>
          </p>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
