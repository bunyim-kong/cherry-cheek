import "./CategoryCard.css";
import "../styles/main.css";
import cleanser from "../assets/images/cleanser.jpg";

function CategoryCard() {
  return (
    <section className="container">
      <div className="content">
        <article className="category-product">
          <div className="container-category_image">
            <img src={toner} alt="Toners" className="category-product__image" />
          </div>

          <div className="category-product__info">
            <p className="category-product__step">STEP1</p>
            <h3 className="category-product__name">Toners</h3>
            <p className="category-product_des">Explore Toners</p>
          </div>
        </article>

        <article className="category-product">
          <div className="container-category_image">
            <img src={toner} alt="Toners" className="category-product__image" />
          </div>

          <div className="category-product__info">
            <p className="category-product__step">STEP1</p>
            <h3 className="category-product__name">Toners</h3>
            <p className="category-product_des">Explore Toners</p>
          </div>
        </article>

        <article className="category-product">
          <div className="container-category_image">
            <img src={toner} alt="Toners" className="category-product__image" />
          </div>

          <div className="category-product__info">
            <p className="category-product__step">STEP1</p>
            <h3 className="category-product__name">Toners</h3>
            <p className="category-product_des">Explore Toners</p>
          </div>
        </article>
      </div>
    </section>
  );
}

export default CategoryCard;