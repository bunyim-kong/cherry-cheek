import "../../styles/main.css";
import "./ProductDetail.css";
import cleanser1 from "../../assets/images/cleanser-1.jpg";
import cleanser2 from "../../assets/images/cleanser-2.jpg";
import ProductCard from "../../components/ProductCard";

// Icon
import { Minus, Plus } from "lucide-react";

const relatedProducts = [
  {
    id: 102,
    name: "Vitamin C Serum",
    brand: "Cherry Cheeks",
    price: 18.5,
    stockQuantity: 18,
    image: "/images/products/102-vitamin-c-serum.jpg",
    rating: 4.8,
    reviews: 74,
    isNew: true,
  },
  {
    id: 103,
    name: "Daily Sunscreen SPF 50",
    brand: "Cherry Cheeks",
    price: 15,
    stockQuantity: 31,
    image: "/images/products/103-daily-sunscreen-spf-50.jpg",
    rating: 4.9,
    reviews: 112,
  },
  {
    id: 104,
    name: "Hydrating Moisturizer",
    brand: "Cherry Cheeks",
    price: 14,
    stockQuantity: 20,
    image: "/images/products/104-hydrating-moisturizer.jpg",
    rating: 4.7,
    reviews: 68,
  },
  {
    id: 201,
    name: "Rose Lip Tint",
    brand: "Cherry Cheeks",
    price: 9,
    stockQuantity: 40,
    image: "/images/products/201-rose-lip-tint.jpg",
    rating: 4.8,
    reviews: 91,
  },
];

function ProductDetail() {
  return (
    <div className="container product-detail">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <span>Shop</span>
        <span>/</span>
        <span>Cleansers</span>
      </nav>

      <section className="product-layout">
        {/* Left: Product Images */}
        <div className="product-gallery">
          <div className="product-thumbnails">
            <img
              src={cleanser1}
              alt="Cleanser front view"
              className="thumbnail"
            />

            <img
              src={cleanser2}
              alt="Cleanser product detail"
              className="thumbnail"
            />
          </div>

          <div className="product-main-image">
            <img src={cleanser1} alt="Dew Reset Cleanser" />
          </div>
        </div>

        {/* Right: Product Information */}
        <div className="product-info">
          <p className="product-brand">MIZU LAB - JAPAN</p>

          <h1 className="product-title">Dew Reset Cleanser</h1>

          <p className="product-rating">
            Rating 4.8 <span>·</span> 126 reviews
          </p>

          <div className="product-price-row">
            <span className="product-price">$24.00</span>
            <span>·</span>
            <span>120 ml</span>
          </div>

          <p className="product-description">
            A low-foam daily cleanser that lifts sunscreen and impurities
            without leaving skin tight.
          </p>

          <p className="static-product-skin-types">
            Normal <span>·</span> Dry <span>·</span> Sensitive
          </p>

          {/* Quantity and Add to Bag */}
          <div className="product-purchase">
            <div className="quantity">
              <button type="button" disabled aria-label="Decrease quantity">
                <Minus size={20} />
              </button>
              <span>1</span>
              <button type="button" aria-label="Increase quantity">
                <Plus size={20} />
              </button>
            </div>

            <button type="button" className="add-button">
              Add to bag · $24.00
            </button>
          </div>

          <p className="product-delivery">
            Free delivery over $80 <span>·</span> Secure checkout
          </p>

          {/* Product Details */}
          <div className="product-extra">
            <section>
              <h2>Why you&apos;ll like it</h2>
              <p>
                A low-foam daily cleanser that lifts sunscreen and impurities
                without leaving skin tight.
              </p>
            </section>

            <section>
              <h2>Ingredients</h2>
              <p>
                Glycerin, panthenol, rice extract and a gentle amino-acid
                cleansing complex.
              </p>
            </section>

            <section>
              <h2>How to use</h2>
              <p>
                Massage one pump onto damp skin for 30 seconds, then rinse with
                lukewarm water.
              </p>
            </section>
          </div>
        </div>
      </section>

      <div className="container-product_related">
        <p className="breadcrumb">COMPLETE THE ROUTINE</p>

        <h2 className="title-product_related">You may also like</h2>
      </div>

      <div className="product-related-recommend">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductDetail;
