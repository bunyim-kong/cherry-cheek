import "./ProductCard.css";
import productImage from "../assets/cloud-milk-toner.jpg";

function ProductCard() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={productImage} alt="Cloud Milk Toner" />
      </div>
      <div className="product-info">
        <p className="category">CHERRY CHEEKS</p>
        <h2 className="product-name">cloud Milk Toner</h2>
      </div>
      <div className="product-meta">
        <p className="rating">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
          </svg>
          <span>4.9 (89)</span>
        </p>
        <p className="price">$25.00</p>
      </div>
    </div>
  );
}
export default ProductCard;
