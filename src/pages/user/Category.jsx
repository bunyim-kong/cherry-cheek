import { ArrowUpRight, Droplets, Sparkles, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import cleanserImage from '../../assets/images/cleanser.jpg';
import serumImage from '../../assets/images/glass-skin-serum.jpg';
import moisturizerImage from '../../assets/images/moisturize.jpg';
import treatImage from '../../assets/images/treat.jpg';
import tonerImage from '../../assets/cloud-milk-toner.jpg';
import './Category.css';

const categories = [
    {
        name: 'Cleansers',
        number: '01',
        description: 'Fresh, comfortable skin starts with a gentle reset.',
        image: cleanserImage,
        to: '/shop?category=cleansers',
        className: 'category-tile--cleanser',
    },
    {
        name: 'Toners',
        number: '02',
        description: 'Lightweight layers that soften and replenish.',
        image: tonerImage,
        to: '/shop?category=toners',
        className: 'category-tile--toner',
    },
    {
        name: 'Serums',
        number: '03',
        description: 'Targeted formulas for the care your skin is asking for.',
        image: serumImage,
        to: '/shop?category=serums',
        className: 'category-tile--serum',
    },
    {
        name: 'Moisturizers',
        number: '04',
        description: 'Lasting comfort, sealed in with cushiony hydration.',
        image: moisturizerImage,
        to: '/shop?category=moisturizers',
        className: 'category-tile--moisturizer',
    },
    {
        name: 'Sun Care',
        number: '05',
        description: 'Easy daily protection with a skin-friendly finish.',
        image: treatImage,
        to: '/shop?category=sun%20care',
        className: 'category-tile--sun',
    },
];

const routine = [
    { icon: Droplets, step: '01', title: 'Cleanse', text: 'Lift away the day without leaving skin feeling tight.' },
    { icon: Sparkles, step: '02', title: 'Treat', text: 'Layer toner or serum where your routine needs extra support.' },
    { icon: Sun, step: '03', title: 'Protect', text: 'Finish with moisturizer and SPF for comfortable daily care.' },
];

function Category() {
    return (
        <div className="category-page">
            <section className="category-browse" aria-labelledby="browse-categories">
                <div className="container category-shell">
                    <div className="category-heading">
                        <div>
                            <p className="category-eyebrow">The routine edit</p>
                            <h2 id="browse-categories">Browse every step</h2>
                        </div>
                        <p>Start with what your skin needs today. Add only what earns its place.</p>
                    </div>

                    <div className="category-grid">
                        {categories.map((category) => (
                            <Link
                                className={`category-tile ${category.className}`}
                                to={category.to}
                                key={category.name}
                                aria-label={`Shop ${category.name}`}
                            >
                                <img src={category.image} alt="" loading="lazy" />
                                <span className="category-tile__veil" />
                                <span className="category-tile__number">{category.number}</span>
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

            <section className="category-routine" aria-labelledby="routine-title">
                <div className="container category-shell category-routine__inner">
                    <div className="category-routine__intro">
                        <p className="category-eyebrow">Keep it simple</p>
                        <h2 id="routine-title">A routine you can return to.</h2>
                        <p>Three thoughtful steps are a good place to begin. Build slowly and listen to your skin.</p>
                        <Link className="category-pill" to="/shop">Shop the full edit</Link>
                    </div>

                    <ol className="category-routine__steps">
                        {routine.map(({ icon: Icon, step, title, text }) => (
                            <li key={title}>
                                <span className="category-routine__icon"><Icon size={21} aria-hidden="true" /></span>
                                <span className="category-routine__step">Step {step}</span>
                                <h3>{title}</h3>
                                <p>{text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>
        </div>
    );
}

export default Category;
