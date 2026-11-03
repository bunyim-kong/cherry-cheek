import { ArrowRight, Droplets, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CategoryCard from "../../components/CategoryCard";
import ProductCard from "../../components/ProductCard";
import "./Homepage.css";
import "../../styles/main.css";

function ProductShelf({ products }) {
    return (
        <div className="cc-product-grid">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

function Homepage() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadHomepageData() {
            const [categoryResponse, productResponse] = await Promise.all([
                fetch("/student-data/categories.json"),
                fetch("/student-data/products.json"),
            ]);

            const [categoryData, productData] = await Promise.all([
                categoryResponse.json(),
                productResponse.json(),
            ]);

            setCategories(categoryData);
            setProducts(productData);
        }

        loadHomepageData();
    }, []);

    const favoriteProducts = products.slice(0, 4);
    const newArrivalProducts = products.slice(4, 8);

    return (
        <div className="homepage">
            <section className="cc-hero">
                <div className="container cc-hero__grid">
                    <div className="cc-hero__copy">
                        <p className="cc-eyebrow">Curated skincare from Asia</p>
                        <h1>A calmer routine starts here.</h1>
                        <p className="cc-hero__lead">Effective, gentle formulas selected to make daily skincare feel clear and considered.</p>
                        <div className="cc-button-row">
                            <Link className="cc-button cc-button--primary" to="/shop">Shop all skincare</Link>
                            <Link className="cc-text-link" to="/our-story">Meet Cherry Cheeks <ArrowRight size={17} aria-hidden="true" /></Link>
                        </div>
                        <div className="cc-hero__notes" aria-label="Product selection benefits">
                            <span><ShieldCheck size={17} aria-hidden="true" /> Carefully selected</span>
                            <span><Leaf size={17} aria-hidden="true" /> Routine friendly</span>
                        </div>
                    </div>

                    <div className="cc-hero__visual">
                        <img src="https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1500&q=90" alt="A considered collection of skincare bottles" width="1500" height="1200" />
                        <div className="cc-hero__caption"><span>Routine 01</span><strong>Hydration, without the guesswork.</strong></div>
                    </div>
                </div>
            </section>

            <section className="cc-trust-strip" aria-label="Store benefits">
                <div className="container cc-trust-strip__grid">
                    <span><Sparkles aria-hidden="true" /> Curated formulas</span>
                    <span><Droplets aria-hidden="true" /> Skin-first guidance</span>
                    <span><ShieldCheck aria-hidden="true" /> Secure checkout</span>
                    <span><Leaf aria-hidden="true" /> Thoughtful routines</span>
                </div>
            </section>

            <section className="cc-section container">
                <div className="cc-section-heading cc-section-heading--split">
                    <div><p className="cc-eyebrow">Find your step</p><h2>Build a routine that feels simple</h2></div>
                    <Link className="cc-text-link cc-desktop-link" to="/category">Shop every category <ArrowRight size={17} aria-hidden="true" /></Link>
                </div>
                <div className="cc-category-grid">
                    {categories.slice(0, 3).map((category) => (
                        <CategoryCard
                            key={category.id}
                            name={category.name}
                            description={category.description}
                            image={category.image}
                            to={`/shop?category=${encodeURIComponent(category.name)}`}
                        />
                    ))}
                </div>
            </section>

            <section className="cc-section cc-section--tint cc-new-arrivals" id="new-arrivals">
                <div className="container">
                    <div className="cc-section-heading cc-section-heading--split">
                        <div><p className="cc-eyebrow">Most loved</p><h2>Community favorites</h2></div>
                        <Link className="cc-text-link" to="/shop">Shop new arrivals <ArrowRight size={17} aria-hidden="true" /></Link>
                    </div>
                    <ProductShelf products={favoriteProducts} />
                </div>
            </section>

            <section className="cc-editorial container">
                <div className="cc-editorial__image">
                    <img src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1300&q=88" alt="Serum bottles arranged in soft natural light" loading="lazy" width="1300" height="1500" />
                </div>

                <div className="cc-editorial__copy">
                    <p className="cc-eyebrow">The Cherry edit</p>
                    <h2>Less noise. Better daily care.</h2>
                    <p>We look for formulas with a clear place in your routine: gentle cleansers, comfortable hydration, and targeted treatments you can use consistently.</p>
                    <Link className="cc-button cc-button--outline" to="/our-story">How we curate</Link>
                </div>
            </section>

            <section className="cc-section cc-section--tint" id="most-loved">
                <div className="container">
                    <div className="cc-section-heading cc-section-heading--split">
                        <div><p className="cc-eyebrow">Just Land</p><h2>New Arrival</h2></div>
                        <Link className="cc-text-link" to="/shop">Shop new arrival <ArrowRight size={17} aria-hidden="true" /></Link>
                    </div>
                    
                    <ProductShelf products={newArrivalProducts} />
                </div>
            </section>
        </div>
    );
}

export default Homepage;
