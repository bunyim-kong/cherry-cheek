import Button from './Button';
import { Link } from 'react-router-dom';
import "./ProductCard.css";
import { useCart } from '../context/cart';

const defaultProduct = {
  brand: "Cherry Cheeks",
  name: "Cloud Milk Toner",
  price: "$25.00",
  stockQuantity: 0,
  isNew: true,
};

function formatPrice(value) {
  return typeof value === 'number' ? `$${value.toFixed(2)}` : value;
}

function ProductCard({ product = {}, onAddToBag }) {
  const { addToCart } = useCart();
  const {
    id,
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

  function handleAddToBag() {
    addToCart(product, 1);
    onAddToBag?.(product);
  }

  return (
    <article className="product-card">
      <div className="product-image">
        <Link
          className="product-image-link"
          to={`/product-detail/${id}`}
          aria-label={`View ${name} details`}
        >
          <img src={image} alt={name} loading="lazy" />
        </Link>

        {badgeLabel && <span className="new-badge">{badgeLabel}</span>}

        <Button
          className="add-to-bag"
          size="compact"
          aria-label={`Add ${name} to bag`}
          onClick={handleAddToBag}
          disabled={!inStock}
        >
          {inStock ? 'Add to bag' : 'Out of stock'}
        </Button>
      </div>

      <div className="product-info">
        <p className="category">{brand}</p>
        <h3 className="product-name">
          <Link className="product-name-link" to={`/product-detail/${id}`}>
            {name}
          </Link>
        </h3>
        <div className="product-meta">
          <p className="product-stock">
            <span>Stock:</span>
            <span className="product-stock-value">{stockQuantity}</span>
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
