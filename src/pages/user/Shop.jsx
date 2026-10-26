import { Search, SlidersHorizontal } from 'lucide-react'; // Icons identify search and mobile filters.
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Shop.css';
import Button from '../../components/Button';
import ProductCard from "../../components/ProductCard";
import { products } from "../../data/products"; // FIX: this was missing, it caused the crash

const categories = ['All', 'Cleansers', 'Toners', 'Serums', 'Moisturizers', 'Sun Care'];

function Shop() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [search, setSearch] = useState('');
    const requestedCategory = searchParams.get('category');
    const category = categories.find(
        (item) => item.toLowerCase() === requestedCategory?.toLowerCase(),
    ) ?? 'All';
    const [sort, setSort] = useState('rating');

    function handleSearchChange(event) {
        const nextSearch = event.target.value;

        setSearchParams((currentParams) => {
            const nextParams = new URLSearchParams(currentParams);

            if (nextSearch) {
                nextParams.set('q', nextSearch);
            } else {
                nextParams.delete('q');
            }

            return nextParams;
        }, { replace: true });
    }

    // Filter + sort the products, only recalculates when search/category/sort change
    const visibleProducts = useMemo(() => {
        const text = search.toLowerCase().trim();

        const filtered = products.filter((p) => {
            const matchesCategory = category === 'All' || p.category === category;
            const searchableText = [
                p.name,
                p.brand,
                p.category,
                p.description,
                ...(p.concerns ?? []),
                ...(p.tags ?? []),
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
            const matchesSearch = !text || searchableText.includes(text);
            return matchesCategory && matchesSearch;
        });

        return [...filtered].sort((a, b) => {
            if (sort === 'price-asc') return a.price - b.price;
            if (sort === 'price-desc') return b.price - a.price;
            if (sort === 'newest') return new Date(b.addedAt) - new Date(a.addedAt);
            return b.rating - a.rating;
        });
    }, [search, category, sort]);

    const countLabel = `${visibleProducts.length} ${visibleProducts.length === 1 ? 'product' : 'products'}`;

    function clearFilters() {
        setSearch('');
        setSort('rating');
        setSearchParams({});
    }

    function handleCategoryChange(nextCategory) {
        setSearchParams(nextCategory === 'All' ? {} : { category: nextCategory.toLowerCase() });
    }

    function handleAddToBag(product) {
        console.log('Added:', product.name);
    }

    return (
        <section className="shop">
            <div className='container'>
                <header className="shop-header">
                    <p className="shop-eyebrow">THE FULL EDIT</p>
                    <h1 className="shop-title">Skincare</h1>
                    <p className="shop-subtitle">
                        Shop gentle everyday formulas by routine step, concern or brand.
                    </p>
                </header>

            <div className="shop-body">
                <div className="shop-toolbar">
                    <Button
                        className="filter-toggle"
                        variant="secondary"
                        onClick={() => setFiltersOpen(true)} // Open the existing filters drawer.
                    >
                        <SlidersHorizontal size={18} aria-hidden="true" />
                        <span>Filters</span>
                    </Button>
                    <div className="toolbar-left">
                        <div className="toolbar-search">
                            <Search size={20} aria-hidden="true" />
                            <input
                                id="shop-search"
                                type="search"
                                aria-label="Search skincare products"
                                placeholder="Search skincare"
                                value={search}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <p className="toolbar-count" aria-live="polite">{countLabel}</p>
                    </div>

                    <div className="toolbar-sort">
                        <label htmlFor="shop-sort">Sort by</label>
                        <select
                            id="shop-sort"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)} // Keep sorting tied to existing state.
                        >
                            <SlidersHorizontal size={18} aria-hidden="true" />
                            <span>Filters</span>
                        </button>
                        <div className="toolbar-left">
                            <div className="toolbar-search">
                                <Search size={20} aria-hidden="true" />
                                <input
                                    id="shop-search"
                                    type="search"
                                    aria-label="Search skincare products"
                                    placeholder="Search skincare"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)} // Keep search tied to existing state.
                                />
                            </div>
                            <p className="toolbar-count" aria-live="polite">{countLabel}</p>
                        </div>

                        <div className="toolbar-sort">
                            <label htmlFor="shop-sort">Sort by</label>
                            <select
                                id="shop-sort"
                                value={sort}
                                onChange={(e) => setSort(e.target.value)} // Keep sorting tied to existing state.
                            >
                                <option value="featured">Featured</option>
                                <option value="rating">Top rated</option>
                                <option value="price-asc">Price: low to high</option>
                                <option value="price-desc">Price: high to low</option>
                            </select>
                        </div>
                    </div>
                </div>


                <div className="shop-body">

                    <div className="shop-layout">

                    <aside className={`filters ${filtersOpen ? 'filters--open' : ''}`}>
                        <div className="filters-mobile-header">
                            <strong>Filters</strong>
                            <Button
                                className="icon-button"
                                variant="icon"
                                onClick={() => setFiltersOpen(false)}
                                aria-label="Close filters"
                            >
                                <X />
                            </Button>
                        </div>

                        <div className="filter-group">
                            <h2>Category</h2>
                            {categories.map((c) => (
                                <label key={c}>
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={category === c}
                                        onChange={() => handleCategoryChange(c)}
                                    />
                                    <span>{c}</span>
                                </label>
                            ))}
                        </div>

                        {(category !== 'All' || search || sort !== 'rating') && (
                            <Button className="clear-button" variant="ghost" onClick={clearFilters}>
                                Clear all filters
                            </Button>
                        )}

                        <Button className="filters-apply" onClick={() => setFiltersOpen(false)}>
                            Show {countLabel}
                        </Button>
                    </aside>

                    {filtersOpen && (
                        <Button
                            className="drawer-backdrop"
                            variant="plain"
                            aria-label="Close filters"
                            onClick={() => setFiltersOpen(false)}
                        />
                    )}

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Shop;
