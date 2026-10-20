import "./ProductCard.css";
import productImage from "../assets/cloud-milk-toner.jpg";

function ProductCard({ oldPrice }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={productImage} alt="Cloud Milk Toner" />
        <span className="new-badge">NEW</span>
        <button className="add-to-bag" type="button">Add to bag</button>
      </div>

      <div className="product-info">
        <p className="category">CHERRY CHEEKS</p>
        <h2 className="product-name">cloud Milk Toner</h2>
        <div className="product-meta">
          <p className="rating">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
            </svg>
            <span className="rating-value">4.9</span>
            <span className="review-count">(89)</span>
          </p>
          <p className="price-line">
            {oldPrice && <span className="old-price">{oldPrice}</span>}
            <span className="price">$25.00</span>
          </p>
        </div>
      </div>
    </article>
  );
}
export default ProductCard;
