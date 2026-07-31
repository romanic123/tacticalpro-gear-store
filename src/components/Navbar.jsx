import React from 'react';
import { FaShoppingCart, FaShieldAlt } from 'react-icons/fa';

function Navbar({ cartCount, activePage, setActivePage, onCartClick }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top border-bottom border-secondary shadow-sm py-2">
      <div className="container d-flex justify-content-between align-items-center">
        
        <button className="navbar-brand btn btn-link text-success fw-bold p-0 border-0 fs-4 d-flex align-items-center gap-2 text-decoration-none" onClick={() => setActivePage('Home')}>
          <FaShieldAlt /> TACTICALPRO
        </button>
        
        <div className="d-flex align-items-center gap-2 order-lg-last">
          <button className="btn btn-outline-success d-flex align-items-center gap-2 position-relative fw-bold px-3 py-1" onClick={onCartClick}>
            <FaShoppingCart /> <span className="d-none d-sm-inline">Cart</span>
            {cartCount > 0 && (
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill shadow">
                {cartCount}
              </span>
            )}
          </button>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto ps-lg-3 mt-2 mt-lg-0">
            <li className="nav-item">
              <button className={`nav-link btn btn-link border-0 text-decoration-none text-start w-100 ${activePage === 'Home' ? 'active text-success fw-bold' : ''}`} onClick={() => setActivePage('Home')}>Home</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link btn btn-link border-0 text-decoration-none text-start w-100 ${activePage === 'Shop' ? 'active text-success fw-bold' : ''}`} onClick={() => setActivePage('Shop')}>Shop</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link btn btn-link border-0 text-decoration-none text-start w-100 ${activePage === 'About' ? 'active text-success fw-bold' : ''}`} onClick={() => setActivePage('About')}>About Logistics</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link btn btn-link border-0 text-decoration-none text-start w-100 ${activePage === 'Warranty' ? 'active text-success fw-bold' : ''}`} onClick={() => setActivePage('Warranty')}>Warranty Policy</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link btn btn-link border-0 text-decoration-none text-start w-100 ${activePage === 'Contact' ? 'active text-success fw-bold' : ''}`} onClick={() => setActivePage('Contact')}>Contact</button>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
