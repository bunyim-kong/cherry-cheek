import { ArrowRight, Droplets, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import CategoryCard from "../../components/CategoryCard";
import ProductCard from "../../components/ProductCard";
import cleanseImage from "../../assets/images/cleanser.jpg";
import moisturizeImage from "../../assets/images/moisturize.jpg";
import treatImage from "../../assets/images/treat.jpg";
import "./Homepage.css";

const routineSteps = [
    {
        step: "Step 01",
        name: "Cleanse",
        note: "Fresh starts, never stripped",
        to: "/shop?category=cleansers",
        image: cleanseImage,
    },
    {
        step: "Step 02",
        name: "Treat",
        note: "Targeted care, made simple",
        to: "/shop?category=serums",
        image: treatImage,
    },
    {
        step: "Step 03",
        name: "Moisturize",
        note: "Comfort that lasts all day",
        to: "/shop?category=moisturizers",
        image: moisturizeImage,
    },
];

const favorites = [
    { brand: "Cherry Cheeks", name: "Cloud Milk Toner", price: "$25.00", rating: "4.9", reviews: "89", badge: "New", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=88" },
    { brand: "Seoul Ritual", name: "Glass Skin Serum", price: "$38.00", rating: "4.9", reviews: "214", badge: "Bestseller", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=88" },
    { brand: "Hana Form", name: "Barrier Bloom Cream", price: "$42.00", rating: "4.7", reviews: "76", badge: "Editor pick", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=88" },
    { brand: "Solskin", name: "Daily Veil SPF 50", price: "$31.00", rating: "4.8", reviews: "143", badge: "Daily essential", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=88" },
];

const newArrivals = [
    { brand: "Pinky Studio", name: "Soft Focus Cleansing Balm", price: "$28.00", rating: "4.8", reviews: "67", badge: "Just in", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=900&q=88" },
    { brand: "Pinky Studio", name: "Dew Petal Essence", price: "$32.00", rating: "4.9", reviews: "41", badge: "New", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=88" },
    { brand: "Pinky Studio", name: "Rosy Barrier Cream", price: "$34.00", rating: "4.7", reviews: "36", badge: "New", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=88" },
    { brand: "Pinky Studio", name: "Cloud Veil Sunscreen", price: "$26.00", rating: "4.8", reviews: "52", badge: "Just in", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=88" },
];

function ProductShelf() {
    return (
        <div className="cc-product-grid">
            {favorites.map((product) => (
                <ProductCard product={product} key={product.name} />
            ))}
        </div>
    );
}

function NewArrival() {
    return (
        <div className="cc-product-grid">
            {newArrivals.map((product) => (
                <ProductCard product={product} key={product.name} />
            ))}
        </div>
    );
}

function Homepage() {
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
                    <Link className="cc-text-link cc-desktop-link" to="/shop">Shop every category <ArrowRight size={17} aria-hidden="true" /></Link>
                </div>
                <div className="cc-category-grid">
                    {routineSteps.map((card, index) => (
                        <CategoryCard
                            key={card.name}
                            step={card.step}
                            name={card.name}
                            description={card.note}
                            image={card.image}
                            to={card.to}
                            featured={index === 1}
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
                    <ProductShelf />
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
                    
                    <NewArrival />
                </div>
            </section>
        </div>
    );
}

export default Homepage;
