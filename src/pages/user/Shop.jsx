import { Search, SlidersHorizontal } from 'lucide-react'; // Icons identify search and mobile filters.
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CloseIcon from '../../components/CloseIcon';
import './Shop.css';
import Button from '../../components/Button';
import ProductCard from "../../components/ProductCard";

function Shop() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const search = searchParams.get('q') ?? '';
    const requestedCategory = searchParams.get('category');
    const categories = useMemo(
        () => ['All', ...new Set(products.map((product) => product.category))],
        [products],
    );
    const category = categories.find(
        (item) => item.toLowerCase() === requestedCategory?.toLowerCase(),
    ) ?? 'All';
    const [sort, setSort] = useState('featured');

    useEffect(() => {
        async function loadShopData() {
            const [productResponse, categoryResponse] = await Promise.all([
                fetch("/student-data/products.json"),
                fetch("/student-data/categories.json"),
            ]);

            const [productData, categoryData] = await Promise.all([
                productResponse.json(),
                categoryResponse.json(),
            ]);

            const categoryById = new Map(
                categoryData.map((category) => [category.id, category.name]),
            );

            const productsWithCategory = productData.map((product) => ({
                ...product,
                category: categoryById.get(product.categoryId) ?? 'Other',
            }));

            setProducts(productsWithCategory);
        }

        loadShopData();
    }, []);

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
            if (sort === 'stock-desc') return b.stockQuantity - a.stockQuantity;
            return a.id - b.id;
        });
    }, [products, search, category, sort]);

    const countLabel = `${visibleProducts.length} ${visibleProducts.length === 1 ? 'product' : 'products'}`;

    function clearFilters() {
        setSort('featured');
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
                            <option value="featured">Featured</option>
                            <option value="price-asc">Price: low to high</option>
                            <option value="price-desc">Price: high to low</option>
                            <option value="stock-desc">Stock: high to low</option>
                        </select>
                    </div>
                </div>

                <div className="shop-layout">

                        <aside className={`filters ${filtersOpen ? 'filters--open' : ''}`}>
                            <div className="filters-mobile-header">
                                <strong>Filters</strong>
                                <button
                                    type="button"
                                    className="icon-button"
                                    onClick={() => setFiltersOpen(false)}
                                    aria-label="Close filters"
                                >
                                    <CloseIcon aria-hidden="true" />
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
                                            onChange={() => handleCategoryChange(c)}
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
                            {visibleProducts.map((p) => (
                                <ProductCard
                                    key={p.id}
                                    product={p}
                                    onAddToBag={() => handleAddToBag(p)}
                                />
                            ))}

                            {visibleProducts.length === 0 && <p>No products found.</p>}
                        </div>

                </div>
            </div>
            </div>
        </section>
    );
}
export default Shop;
