import Button from './Button';
import "./ProductCard.css";
import productImage from "../assets/cloud-milk-toner.jpg";

const defaultProduct = {
  brand: "Cherry Cheeks",
  name: "Cloud Milk Toner",
  price: "$25.00",
  rating: "4.9",
  reviews: "89",
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
        >
          Add to bag
        </Button>
      </div>

      <div className="product-info">
        <p className="category">{item.brand}</p>
        <h3 className="product-name">{item.name}</h3>
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
            <span className="rating-value">{item.rating}</span>
            <span className="review-count">({item.reviews})</span>
          </p>
          <p className="price-line">
            {item.oldPrice != null && <span className="old-price">{formatPrice(item.oldPrice)}</span>}
            <span className="price">{formatPrice(item.price)}</span>
          </p>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
