import { X } from 'lucide-react'; // removed Search + SlidersHorizontal since they aren't used yet
import { useMemo, useState } from 'react';
import './Shop.css';
import ProductCard from "../../components/ProductCard";
import { products } from "../../data/products"; // FIX: this was missing, it caused the crash

const categories = ['All', 'Cleansers', 'Toners', 'Serums', 'Moisturizers', 'Sun Care'];

function Shop() {
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [sort, setSort] = useState('featured');

    // Filter + sort the products, only recalculates when search/category/sort change
    const visibleProducts = useMemo(() => {
        const text = search.toLowerCase().trim();

        const filtered = products.filter((p) => {
            const matchesCategory = category === 'All' || p.category === category;
            const matchesSearch = `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(text);
            return matchesCategory && matchesSearch;
        });

        return [...filtered].sort((a, b) => {
            if (sort === 'price-low') return a.price - b.price;
            if (sort === 'price-high') return b.price - a.price;
            if (sort === 'newest') return new Date(b.addedAt) - new Date(a.addedAt);
            return b.rating - a.rating;
        });
    }, [search, category, sort]);

    const countLabel = `${visibleProducts.length} ${visibleProducts.length === 1 ? 'product' : 'products'}`;

    function clearFilters() {
        setSearch('');
        setCategory('All');
        setSort('featured');
    }

    // Example handler, replace with real cart logic later
    function handleAddToBag(product) {
        console.log('Added:', product.name);
    }

    return (
        <section className="shop">
            <header className="shop-header">
                <h1 className="shop-title">Skincare</h1>
                <p className="shop-subtitle">
                    Shop gentle everyday formulas by routine step, concern or brand.
                </p>
            </header>

            <div className="shop-body">
                {/* FIX: removed the duplicate shop-grid that was sitting here */}

                <div className="shop-layout">

                    {/* left sidebar (slide-in drawer on mobile) */}
                    <aside className={`filters ${filtersOpen ? 'filters--open' : ''}`}>
                        <div className="filters-mobile-header">
                            <strong>Filters</strong>
                            <button
                                type="button"
                                className="icon-button"
                                onClick={() => setFiltersOpen(false)}
                                aria-label="Close filters"
                            >
                                <X />
                            </button>
                        </div>

                        <div className="filter-group">
                            <h2>Category</h2>
                            {categories.map((c) => (
                                <label key={c}>
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={category === c}
                                        onChange={() => setCategory(c)}
                                    />
                                    <span>{c}</span>
                                </label>
                            ))}
                        </div>

                        {(category !== 'All' || search || sort !== 'featured') && (
                            <button className="clear-button" type="button" onClick={clearFilters}>
                                Clear all filters
                            </button>
                        )}

                        <button className="filters-apply" type="button" onClick={() => setFiltersOpen(false)}>
                            Show {countLabel}
                        </button>
                    </aside>

                    {filtersOpen && (
                        <button
                            className="drawer-backdrop"
                            type="button"
                            aria-label="Close filters"
                            onClick={() => setFiltersOpen(false)}
                        />
                    )}

                    {/* product grid */}
                    <div className="shop-grid">
                        {/* FIX: real ProductCard instead of the placeholder block */}
                        {visibleProducts.map((p) => (
                            <ProductCard
                                key={p.id}
                                product={p}
                                onAddToBag={() => handleAddToBag(p)}
                            />
                        ))}

                        {/* Shows when filters match nothing */}
                        {visibleProducts.length === 0 && <p>No products found.</p>}
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Shop;