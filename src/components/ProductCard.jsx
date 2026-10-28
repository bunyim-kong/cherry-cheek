import Button from './Button';
import "./ProductCard.css";
import productImage from "../assets/cloud-milk-toner.jpg";

function ProductCard({ product, onAddToBag }) {
  const { image, name, brand, rating, reviews, price, oldPrice, isNew } = product;

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
        <p className="category">{brand}</p>
        <h2 className="product-name">{name}</h2>
        <div className="product-meta">
          <p className="rating">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
            </svg>
            <span className="rating-value">{rating}</span>
            <span className="review-count">({reviews})</span>
          </p>
          <p className="price-line">
            {oldPrice && <span className="old-price">${oldPrice.toFixed(2)}</span>}
            <span className="price">${price.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
