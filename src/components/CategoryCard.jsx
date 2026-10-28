import "./CategoryCard.css";
import { Link } from "react-router-dom";

function CategoryCard({ step, name, description, image, to, featured = false }) {
  return (
    <Link
      className={`cc-category-card${featured ? " cc-category-card--featured" : ""}`}
      to={to}>
        
      <img src={image} alt="" loading="lazy" />
      <span className="cc-category-card__overlay">
        <span>{step}</span>
        <strong>{name}</strong>
        <small>{description}</small>
      </span>
    </Link>
  );
}

export default CategoryCard;
