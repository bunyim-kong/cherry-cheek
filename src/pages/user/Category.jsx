import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Category.css';

function Category() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {

        async function getCategories() {
                const response = await fetch('/student-data/categories.json');
                const data = await response.json();

                setCategories(data);
        }

        getCategories();
    }, []);

    return (
        <div className="category-page">
            <section className="category-browse" aria-labelledby="browse-categories">
                <div className="container category-shell">
                    <div className="category-heading">
                        <div>
                            <p className="category-eyebrow">Shop by category</p>
                            <h1 id="browse-categories">Find your everyday favorites.</h1>
                        </div>
                        <p>Explore beauty essentials selected for every part of your daily ritual.</p>
                    </div>

                    <div className="category-grid">
                        {categories.map((category) => (

                            <Link
                                key={category.id}
                                className="category-tile"
                                to={`/shop?category=${encodeURIComponent(category.name)}`}
                                aria-label={`Shop ${category.name}`}
                            >
                                <img src={category.image} alt="" loading="lazy" />
                                <span className="category-tile__veil" />
                                <span className="category-tile__number">
                                    {String(category.id).padStart(2, '0')}
                                </span>
                                <span className="category-tile__copy">
                                    <strong>{category.name}</strong>
                                    <small>{category.description}</small>
                                </span>
                                <span className="category-tile__arrow" aria-hidden="true">
                                    <ArrowUpRight size={20} />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Category;
