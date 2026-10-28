import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../styles/main.css';
import './Navbar.css';

const navLinks = [
    { label: 'Shop', to: '/shop' },
    { label: 'Category', to: '/category' },
    { label: 'Our Story', to: '/our-story' },
    { label: 'About', to: '/about' },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [search, setSearch] = useState('');
    const searchButtonRef = useRef(null);
    const searchOverlayRef = useRef(null);
    const searchInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!menuOpen) return undefined;

        function closeMenu(event) {
            if (event.key === 'Escape') setMenuOpen(false);
        }

        document.addEventListener('keydown', closeMenu);
        return () => document.removeEventListener('keydown', closeMenu);
    }, [menuOpen]);

    useEffect(() => {
        if (!searchOpen) return undefined;

        const searchButton = searchButtonRef.current;

        function handleDialogKeys(event) {
            if (event.key === 'Escape') {
                event.preventDefault();
                setSearchOpen(false);
                return;
            }

            if (event.key !== 'Tab') return;

            const focusable = [
                ...(searchOverlayRef.current?.querySelectorAll('button, input') ?? []),
            ].filter((element) => !element.disabled);

            if (focusable.length === 0) return;

            const firstElement = focusable[0];
            const lastElement = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }

        searchInputRef.current?.focus();
        document.addEventListener('keydown', handleDialogKeys);

        return () => {
            document.removeEventListener('keydown', handleDialogKeys);
            searchButton?.focus();
        };
    }, [searchOpen]);

    useEffect(() => {
        if (!menuOpen && !searchOpen) return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [menuOpen, searchOpen]);

    function submitSearch(event) {
        event.preventDefault();
        const query = search.trim();

        navigate(query ? `/shop?q=${encodeURIComponent(query)}` : '/shop');
        setMenuOpen(false);
        setSearchOpen(false);
    }

    return (
        <>
            <header className="header">
                <div className="navbar">
                    <button
                      className="hamburger"
                      type="button"
                      aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                      aria-expanded={menuOpen}
                      aria-controls="mobile-navigation"
                      onClick={() => setMenuOpen((isOpen) => !isOpen)}>
                        {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
                    </button>

                    <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
                        Cherry <span>Cheek</span>
                    </Link>

                    <nav
                      id="mobile-navigation"
                      className={`nav-links ${menuOpen ? 'open' : ''}`}
                      aria-label="Primary navigation">
                        <form className="mobile-search" onSubmit={submitSearch}>
                            <Search aria-hidden="true" />
                            <label className="sr-only" htmlFor="mobile-site-search">
                                Search products
                            </label>
                            <input
                              id="mobile-site-search"
                              type="search"
                              placeholder="Search skincare"
                              value={search}
                              onChange={(event) => setSearch(event.target.value)}
                              autoComplete="off"
                            />
                            <button type="submit">Search</button>
                        </form>

                        {navLinks.map((item) => (
                            <NavLink
                              className="nav-items"
                              key={item.label}
                              to={item.to}
                              onClick={() => setMenuOpen(false)}>
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="nav-action">
                        <button
                          ref={searchButtonRef}
                          className="icon-btn desktop-search"
                          type="button"
                          aria-label="Search products"
                          aria-haspopup="dialog"
                          aria-expanded={searchOpen}
                          onClick={() => setSearchOpen(true)}>
                            <Search aria-hidden="true" />
                        </button>

                        <Link className="icon-btn" to="/login" aria-label="Your account">
                            <UserRound aria-hidden="true" />
                        </Link>

                        <Link className="icon-btn" to="/cart" aria-label="Shopping bag">
                            <ShoppingBag aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </header>

            {searchOpen && (
                <div
                  ref={searchOverlayRef}
                  className="search-overlay"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="search-dialog-title"
                  onMouseDown={(event) => {
                      if (event.target === event.currentTarget) setSearchOpen(false);
                  }}>
                    <button
                      className="search-overlay__close"
                      type="button"
                      aria-label="Close search"
                      onClick={() => setSearchOpen(false)}>
                        <X aria-hidden="true" />
                    </button>

                    <div className="search-dialog-content">
                        <h2 id="search-dialog-title">What are you looking for?</h2>
                        <form className="search-form" onSubmit={submitSearch}>
                            <label className="sr-only" htmlFor="site-search">
                                Search products
                            </label>
                            <div className="search-form__control">
                                <Search aria-hidden="true" />
                                <input
                                  id="site-search"
                                  ref={searchInputRef}
                                  type="search"
                                  value={search}
                                  onChange={(event) => setSearch(event.target.value)}
                                  placeholder="Search serum, cleanser, sunscreen..."
                                  autoComplete="off"
                                />
                                <button type="submit">Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
