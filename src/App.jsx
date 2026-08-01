import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CheckoutGateway from './components/CheckoutGateway';
import AboutLogistics from './components/AboutLogistics';
import ShoppingCart from './components/ShoppingCart';
import products from './data/products';
import { FaShieldAlt, FaInfoCircle, FaFileInvoiceDollar, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('Home');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('none');

  const [pageHistory, setPageHistory] = useState(['Home']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isInternalNavigating, setIsInternalNavigating] = useState(false);

  useEffect(() => {
    if (isInternalNavigating) {
      setIsInternalNavigating(false);
      return;
    }
    if (pageHistory[historyIndex] === activePage) return;

    const cleanHistory = pageHistory.slice(0, historyIndex + 1);
    const updatedHistory = [...cleanHistory, activePage];
    
    setPageHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
  }, [activePage]);

  useEffect(() => {
    window.history.pushState({ page: activePage }, '', '');
    const handlePopState = (event) => {
      event.preventDefault();
      handleTriggerBack();
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activePage, historyIndex, pageHistory]);

  const handleTriggerBack = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setIsInternalNavigating(true);
      setHistoryIndex(prevIndex);
      setActivePage(pageHistory[prevIndex]);
    } else {
      setActivePage('Home');
    }
  };

  const handleTriggerForward = () => {
    if (historyIndex < pageHistory.length - 1) {
      const nextIndex = historyIndex + 1;
      setIsInternalNavigating(true);
      setHistoryIndex(nextIndex);
      setActivePage(pageHistory[nextIndex]);
    }
  };

  const addToCart = (productWithSelection) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === productWithSelection.id && item.selectedSize === productWithSelection.selectedSize
      );
      if (existingItem) {
        return prevItems.map((item) =>
          (item.id === productWithSelection.id && item.selectedSize === productWithSelection.selectedSize)
            ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...productWithSelection, quantity: 1 }];
    });
  };

  const removeFromCart = (id, selectedSize) => {
    setCartItems((prevItems) => prevItems.filter((item) => !(item.id === id && item.selectedSize === selectedSize)));
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = subtotal * 0.10;
  const tax = (subtotal - discount) * 0.15;
  const grandTotal = subtotal - discount + tax;

  return (
    <div className="bg-light min-vh-100 d-flex flex-column" style={{ paddingTop: '70px' }}>
      <Navbar cartCount={totalItemsCount} activePage={activePage} setActivePage={setActivePage} onCartClick={() => setIsCartOpen(true)} />

      <div className="bg-white border-bottom py-2 shadow-sm sticky-history-bar">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <button 
              className={`btn btn-sm ${historyIndex === 0 ? 'btn-outline-secondary opacity-50' : 'btn-success fw-bold text-white'}`}
              onClick={handleTriggerBack}
              disabled={historyIndex === 0}
            >
              <FaArrowLeft className="me-1" /> Back
            </button>
            <button 
              className={`btn btn-sm ${historyIndex === pageHistory.length - 1 ? 'btn-outline-secondary opacity-50' : 'btn-success fw-bold text-white'}`}
              onClick={handleTriggerForward}
              disabled={historyIndex === pageHistory.length - 1}
            >
              Forward <FaArrowRight className="ms-1" />
            </button>
          </div>
          <div className="small font-monospace text-muted text-uppercase bg-light px-3 py-1 rounded border d-none d-md-block">
            Trace Path Log: {pageHistory.map((h, i) => (
              <span key={i} className={i === historyIndex ? 'text-success fw-bold' : ''}>
                {h}{i < pageHistory.length - 1 ? ' → ' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-grow-1">
        {activePage === 'Home' && (
          <>
            <header className="py-5 text-white text-center mb-5 tactical-hero-banner mt-3">
              <div className="container py-4">
                <h1 className="display-4 fw-bold text-uppercase mb-2">TacticalPro Store</h1>
                <div className="d-flex justify-content-center my-3 text-success">
                  <FaShieldAlt style={{ fontSize: '60px', filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.5))' }} />
                </div>
                <p className="lead text-light mb-4">High-performance mission-ready gear and active hardware engineering.</p>
                <button className="btn btn-success fw-bold px-4 py-2 shadow" onClick={() => setActivePage('Shop')}>
                  ENTER ONLINE STOREFRONT
                </button>
              </div>
            </header>
            <main className="container flex-grow-1">
              <div className="row my-4 align-items-center bg-white p-4 rounded shadow-sm border">
                <div className="col-md-7">
                  <h3 className="fw-bold text-dark border-start border-success border-4 ps-3 mb-3">Operator Standards</h3>
                  <p className="text-secondary">Welcome to TacticalPro Gear. We cater to law enforcement, security personnel, and outdoor enthusiasts who refuse to compromise on build resilience.</p>
                </div>
                <div className="col-md-5 text-center fs-1 text-success">
                  <FaShieldAlt style={{ fontSize: '100px', opacity: 0.8 }} />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4 mt-5"><h4 className="fw-bold border-start border-success border-4 ps-3 mb-0">Featured Preview</h4></div>
              <div className="row">{products.slice(0, 3).map((item) => <ProductCard key={item.id} product={item} onAddToCart={addToCart} />)}</div>
            </main>
          </>
        )}
        {activePage === 'Shop' && (
          <main className="container flex-grow-1 mt-4 pt-2">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold border-start border-success border-4 ps-3 mb-0">Full Operational Inventory</h2>
              <span className="badge bg-dark px-3 py-2 fs-6">{products.length} Items Available</span>
            </div>
            <div className="row">{products.map((item) => <ProductCard key={item.id} product={item} onAddToCart={addToCart} />)}</div>
          </main>
        )}

        {activePage === 'About' && <AboutLogistics />}

        {activePage === 'Warranty' && (
          <main className="container flex-grow-1 mt-4 pt-2">
            <div className="p-5 bg-white rounded shadow-sm border mb-4">
              <h2 className="fw-bold border-start border-success border-4 ps-3 mb-4 text-uppercase">
                <FaInfoCircle className="text-success me-2" /> Extended Warranty Coverage Plan
              </h2>
              <p className="text-secondary lead">Every authorized acquisition transaction executed on our storefront engine includes a comprehensive <strong>1-Year Structural Protection Warranty or full Cash-Back policy coverage</strong>.</p>
              <hr className="my-4"/>
              <h5 className="fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <FaFileInvoiceDollar className="text-success" /> Cash-Back Clause Conditions &amp; Fine Print
              </h5>
              <p className="text-muted small bg-light p-3 rounded border font-monospace">
                * CASH BACK POLICY FINE PRINT: In strict compliance with material liability guidelines, processing an official asset return or financial cash-back deployment protocol strictly requires the presentation of an authenticated structural Proof of Payment receipt log.
              </p>
            </div>
          </main>
        )}

        {activePage === 'Contact' && (
          <main className="container flex-grow-1 mt-4 pt-2">
            <div className="p-5 bg-dark text-white rounded shadow border border-secondary mb-4">
              <h2 className="fw-bold border-start border-success border-4 ps-3 mb-4 text-success text-uppercase">HQ Command Terminal</h2>
              <hr className="border-secondary my-4" />
              <div className="row g-4 font-sans-serif">
                <div className="col-md-4">
                  <h5 className="text-success fw-bold small text-uppercase mb-2"><FaMapMarkerAlt className="me-2"/>Physical Outpost Path</h5>
                  <p className="text-light-50 small mb-0">TACTICALPRO<br/>123 NEW STREET LAKEWORTH FL<br/>USA</p>
                </div>
                <div className="col-md-4">
                  <h5 className="text-success fw-bold small text-uppercase mb-2"><FaPhoneAlt className="me-2"/>Secure Comms Link</h5>
                  <p className="text-light-50 font-monospace small mb-0">CONTACT: 1876 123-4567</p>
                </div>
                <div className="col-md-4">
                  <h5 className="text-success fw-bold small text-uppercase mb-2"><FaEnvelope className="me-2"/>Data Gateway Hub</h5>
                  <p className="text-light-50 font-monospace small mb-0">EMAIL: xzyTACTICALPRO@aolmail.com</p>
                </div>
              </div>
            </div>
          </main>
        )}
      </div>

      <div className="container mt-5 pt-3">
        <section className="p-4 bg-white rounded border text-center shadow-sm mb-5">
          <div className="d-flex justify-content-center align-items-center gap-2 mb-2 text-success fw-bold">SECURE CHECKOUT CONTEXT GUARANTEED</div>
          <p className="text-muted small mb-0">Protected using 256-bit automated encryption processing. Secure execution token validated mapping rules active.</p>
        </section>
      </div>

      <footer className="bg-dark text-secondary py-3 mt-auto border-top border-secondary">
        <div className="container d-flex justify-content-between align-items-center small">
          <span>&copy; 2026 TacticalPro Store. All Rights Reserved.</span>
          <span className="badge bg-secondary font-monospace text-uppercase">Build v1.5.0-stable</span>
        </div>
      </footer>

      <ShoppingCart 
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        subtotal={subtotal}
        discount={discount}
        tax={tax}
        grandTotal={grandTotal}
        onCheckout={() => { setIsCartOpen(false); setCheckoutStep('form'); }}
      />

      <CheckoutGateway step={checkoutStep} setStep={setCheckoutStep} grandTotal={grandTotal} clearCart={() => setCartItems([])} />
    </div>
  );
}

export default App;
