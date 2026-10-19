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
    return (
        <>
            <header className='header'>
                <div className='navbar'>
                    <Link to="/" className='logo'>
                        Cherry <span>Cheek</span>
                    </Link>

                    <nav className='nav-links'>
                        {navLinks.map((item)=> (
                            <NavLink className='nav-items' key={item.label} to={item.to}>
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="nav-action">
                        <button className='icon-btn'>
                            <Search />
                        </button>

                        <button className='icon-btn'>
                            <UserRound />
                        </button>

                        <button className='icon-btn'>
                            <ShoppingBag />
                        </button>
                    </div>
                </div>
            </header>
        </>
    )
}