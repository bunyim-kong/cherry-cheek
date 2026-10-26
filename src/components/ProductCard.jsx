import "./ProductCard.css";
import productImage from "../assets/images/cloud-milk-toner.jpg";

const defaultProduct = {
  brand: "Cherry Cheeks",
  name: "Cloud Milk Toner",
  price: "$25.00",
  rating: "4.9",
  reviews: "89",
  badge: "New",
  image: productImage,
};

function ProductCard({ product = {}, oldPrice, onAddToBag }) {
  const item = {
    ...defaultProduct,
    ...product,
    oldPrice: product.oldPrice ?? oldPrice,
  };

  return (
    <article className="product-card">
      <div className="product-image">
        <img src={item.image} alt={`${item.name} by ${item.brand}`} loading="lazy" />
        {item.badge && <span className="new-badge">{item.badge}</span>}
        <button className="add-to-bag" type="button" onClick={onAddToBag} aria-label={`Add ${item.name} to bag`}>
          Add to bag
        </button>
      </div>

      <div className="product-info">
        <p className="category">{item.brand}</p>
        <h3 className="product-name">{item.name}</h3>
        <div className="product-meta">
          <p className="rating">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
            </svg>
            <span className="rating-value">{item.rating}</span>
            <span className="review-count">({item.reviews})</span>
          </p>
          <p className="price-line">
            {item.oldPrice && <span className="old-price">{item.oldPrice}</span>}
            <span className="price">{item.price}</span>
          </p>
        </div>
      </div>
    </article>
  );
}
export default ProductCard;
