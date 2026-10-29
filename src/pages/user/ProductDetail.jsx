import "../../styles/main.css";
import "./ProductDetail.css";
import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { useCart } from "../../context/cart";

function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { productId } = useParams();
  const parsedProductId = Number(productId);
  const selectedProductId = Number.isInteger(parsedProductId)
    ? parsedProductId
    : 101;
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function getProductDetail() {
      try {
        const response = await fetch("/student-data/products.json");
        const productDetailData = await response.json();

        if (!ignore) {
          setProductDetails(productDetailData);
        }
      } catch (fetchError) {
        if (!ignore) {
          setError(fetchError.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    getProductDetail();

    return () => {
      ignore = true;
    };
  }, []);

  const relatedProducts = productDetails
    .filter((product) => product.id !== selectedProductId)
    .slice(0, 4);
  const selectedProducts = productDetails.filter(
    (product) => product.id === selectedProductId,
  );

  if (loading) {
    return <p className="container product-detail">Loading product...</p>;
  }

  if (error) {
    return (
      <p className="container product-detail" role="alert">
        {error}
      </p>
    );
  }

  if (selectedProducts.length === 0) {
    return (
      <p className="container product-detail" role="alert">
        Product not found.
      </p>
    );
  }

  return (
    <div className="container product-detail">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <span>Shop</span>
        <span aria-hidden="true">/</span>
        <span>Cleansers</span>
      </nav>

      {selectedProducts.map((product) => (
        <section className="product-layout" key={product.id}>
          <div className="product-gallery">
            <div className="product-thumbnails">
              <img
                src={product.image}
                alt={`${product.name} thumbnail`}
                className="thumbnail"
              />
            </div>

            <div className="product-main-image">
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          <div className="product-info">
            <p className="product-brand">{product.brand}</p>
            <h1 className="product-title">{product.name}</h1>

            <p className="product-rating">
              Rating {product.rating} <span>·</span> {product.reviews} reviews
            </p>

            <div className="product-price-row">
              <span className="product-price">${product.price.toFixed(2)}</span>
              <span>·</span>
              <span>{product.size}</span>
            </div>

            <p className="product-description">{product.description}</p>

            <p className="static-product-skin-types">
              {product.suitableFor.join(" · ")}
            </p>

            <div className="product-purchase">
              <div className="quantity">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                >
                  <Minus size={20} aria-hidden="true" />
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  aria-label="Increase quantity"
                  disabled={quantity >= product.stockQuantity}
                  onClick={() =>
                    setQuantity((current) =>
                      Math.min(product.stockQuantity, current + 1),
                    )
                  }
                >
                  <Plus size={20} aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                className="add-button"
                disabled={product.stockQuantity === 0}
                onClick={() => addToCart(product, quantity)}
              >
                {product.stockQuantity > 0
                  ? `Add to bag · $${(product.price * quantity).toFixed(2)}`
                  : "Out of stock"}
              </button>
            </div>

            <p className="product-delivery">
              Free delivery over $80 <span>·</span> Secure checkout
            </p>

            <div className="product-extra">
              <section>
                <h2>Why you&apos;ll like it</h2>
                <ul>
                  {product.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2>Key ingredients</h2>
                <p>{product.keyIngredients.join(", ")}</p>
              </section>

              <section>
                <h2>How to use</h2>
                <p>{product.howToUse}</p>
              </section>
            </div>
          </div>
        </section>
      ))}

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
