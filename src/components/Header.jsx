import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../ctx/AuthCtx.jsx'
import './Header.css'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/ideas', label: 'Ideas' },
  { to: '/about', label: 'About' },
  { to: '/contacts', label: 'Contacts' },
]

const Header = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__brand" onClick={closeMenu}>
          <span className="header__logo" aria-hidden="true">💡</span>
          <span className="header__title">My Website</span>
        </Link>

        <button
          type="button"
          className="header__toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`header__menu ${menuOpen ? 'header__menu--open' : ''}`}>
          <nav>
            <ul className="nav__list">
              {links.map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink to={to} end={end} className="nav__link" onClick={closeMenu}>{label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__account">
            {user ? (
              <>
                <span className="header__user">
                  <span className="header__avatar" aria-hidden="true">{user.name?.[0]?.toUpperCase()}</span>
                  {user.name}
                </span>
                <button
                  type="button"
                  className="header__btn header__btn--ghost"
                  onClick={() => { closeMenu(); navigate('/logout') }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="header__btn header__btn--ghost" onClick={closeMenu}>Login</NavLink>
                <NavLink to="/register" className="header__btn" onClick={closeMenu}>Sign up</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
