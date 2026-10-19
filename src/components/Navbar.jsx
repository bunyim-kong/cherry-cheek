import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../styles/main.css';
import './Navbar.css';

const navLinks = [
    { label: 'Shop', to: '/shop' },
    { label: 'Category', to: '/category' },
    { label: 'Our Story', to: '/our-story' },
    { label: 'About', to: '/about' },
]

export default function Navbar() {
    const [ menuOpen, setMenuOpen ] = useState(false);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    function handleSearch(event) {
        event.preventDefault();

        const query = Search.trim();

        if(query) {
            navigate(`/shop?q=${encodeURIComponent(query)}`);
            setMenuOpen(false);
        }
    }

    return (
        <>
            <header className='header'>
                <div className='navbar'>
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
                        <button className='icon-btn desktop-search' type='button'>
                            <Search />
                        </button>

                        <button className='icon-btn' to='/login'>
                            <UserRound />
                        </button>

                        <button className='icon-btn' to='/cart'>
                            <ShoppingBag />
                        </button>
                    </div>
                </div>
            </header>
        </>
    )
}