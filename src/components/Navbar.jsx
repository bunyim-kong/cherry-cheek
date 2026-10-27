import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import '../styles/main.css';
import './Navbar.css';

const navLinks = [
    { label: 'Shop', to: '/shop' },
    { label: 'Category', to: '/shop' },
    { label: 'Our Story', to: '/our-story' },
    { label: 'About', to: '/about' },
]

export default function Navbar() {
    const { user } = useAuth();
    const [ menuOpen, setMenuOpen ] = useState(false);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    function handleSearch(event) {
        event.preventDefault();

        const query = search.trim();

        if(query) {
            navigate(`/shop?q=${encodeURIComponent(query)}`);
            setMenuOpen(false);
        }
    }

    return (
        <>
            <header className='header'>
                <div className='navbar'>
                    <button 
                      className='hamberger' 
                      type='button' 
                      aria-label={menuOpen ? 'Close menu' : 'Open menu'} 
                      aria-expanded={menuOpen}
                      aria-controls='mobile-navigation'
                      onClick={() => setMenuOpen(!menuOpen)}>

                        {menuOpen ? <X /> : <Menu />}
                    </button>

                    <Link to="/" className='logo'>
                        Cherry <span>Cheek</span>
                    </Link>

                    <nav 
                      id='mobile-navigation'
                      className={`nav-links ${menuOpen ? 'open' : ''}`}>

                        <form action="" className='mobile-search' onSubmit={handleSearch}>
                            <input 
                              type="search" 
                              placeholder='Search Skincare' 
                              value={search} onChange={(event) => setSearch(event.target.value)} 
                              aria-label='Search Skincare'
                              />

                            <button type='submit'>
                                Search
                            </button>
                        </form>

                        {navLinks.map((item)=> (
                            <NavLink className='nav-items' key={item.label} to={item.to}>
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="nav-action">
                        <button className='icon-btn desktop-search flex items-center justify-center' type='button'>
                            <Search />
                        </button>

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
        </>
    )
}
