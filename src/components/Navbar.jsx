import { Menu, Search, ShoppingBag, UserRound } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from './Button';
import '../styles/main.css';
import Button from './Button';
import CloseIcon from './CloseIcon';
import './Navbar.css';

const navLinks = [
    { label: 'Shop', to: '/shop' },
    { label: 'Category', to: '/shop' },
    { label: 'Our Story', to: '/our-story' },
    { label: 'About', to: '/about' },
];

export default function Navbar() {
    const { user } = useAuth();
    const [ menuOpen, setMenuOpen ] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [search, setSearch] = useState('');
    const searchButtonRef = useRef(null);
    const searchOverlayRef = useRef(null);
    const searchInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!searchOpen) return undefined;

        const previousOverflow = document.body.style.overflow;
        const searchButton = searchButtonRef.current;

        function handleDialogKeys(event) {
            if (event.key === 'Escape') {
                event.preventDefault();
                setSearchOpen(false);
                return;
            }

            if (event.key !== 'Tab') return;

            const focusable = [
                ...searchOverlayRef.current?.querySelectorAll('button, input') ?? [],
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
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleDialogKeys);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleDialogKeys);
            searchButton?.focus();
        };
    }, [searchOpen]);

    function submitSearch(event) {
        event.preventDefault();

        const query = search.trim();

        navigate(query ? `/shop?q=${encodeURIComponent(query)}` : '/shop');
        setSearchOpen(false);
        setMenuOpen(false);
    }

    return (
        <>
            <header className="header">
                <div className="navbar container">
                    <Button
                      className="hamburger"
                      variant="icon"
                      aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                      aria-expanded={menuOpen}
                      aria-controls="mobile-navigation"
                      onClick={() => setMenuOpen((isOpen) => !isOpen)}>
                        {menuOpen ? <CloseIcon aria-hidden="true" /> : <Menu aria-hidden="true" />}
                    </Button>

                    <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
                        Cherry <span>Cheek</span>
                    </Link>

                    <nav 
                      id='mobile-navigation'
                      className={`nav-links ${menuOpen ? 'open' : ''}`}>

                        <form className='mobile-search' onSubmit={submitSearch}>
                            <Search aria-hidden="true" />

                            <label className="sr-only" htmlFor="mobile-site-search">
                                Search products
                            </label>

                            <input 
                              id="mobile-site-search"
                              type="search" 
                              placeholder='Search Skincare' 
                              value={search} onChange={(event) => setSearch(event.target.value)} 
                              autoComplete="off"
                              />

                            <button type='submit'>
                                Search
                            </button>
                        </form>

                        {navLinks.map((item)=> (
                            <NavLink
                              className='nav-items'
                              key={item.label}
                              to={item.to}
                              onClick={() => setMenuOpen(false)}>
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="nav-action">
                        <Button
                          ref={searchButtonRef}
                          className='icon-btn desktop-search flex items-center justify-center'
                          type='button'
                          aria-label='Search products'
                          aria-haspopup='dialog'
                          onClick={() => setSearchOpen(true)}>
                            <Search aria-hidden="true" />
                        </Button>

                        <Link
                          className='icon-btn flex items-center justify-center'
                          to={user ? '/account' : '/login'}
                          aria-label={user ? 'Your account' : 'Sign in'}>
                            <UserRound />
                        </Link>

                        <button
                          className='icon-btn flex items-center justify-center'
                          type='button'
                          aria-label='Shopping bag'>
                            <ShoppingBag />
                        </button>
                    </div>
                </div>
            </header>

            {searchOpen && (
                <div
                  ref={searchOverlayRef}
                  className="search-overlay"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="search-dialog-title">
                    <button
                      className="search-overlay__close"
                      variant="icon"
                      aria-label="Close search"
                      onClick={() => setSearchOpen(false)}>
                        <CloseIcon aria-hidden="true" />
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
                                <Button type="submit" variant="secondary">Search</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
