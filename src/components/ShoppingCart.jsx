import React from 'react';
import { FaTrash } from 'react-icons/fa';

function ShoppingCart({ isCartOpen, setIsCartOpen, cartItems, removeFromCart, subtotal, discount, tax, grandTotal, onCheckout }) {
  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-sidebar bg-dark text-white p-4 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <h4 className="fw-bold text-success mb-3 pb-2 border-bottom border-secondary">Shopping Cart</h4>
        
        <div className="flex-grow-1 overflow-y-auto mb-3" style={{ maxHeight: '55vh' }}>
          {cartItems.length === 0 ? (
            <p className="text-muted text-center py-5">Your cart is empty.</p>
          ) : (
            cartItems.map((item, idx) => (
              <div key={`${item.id}-${item.selectedSize}-${idx}`} className="d-flex align-items-center gap-3 bg-secondary bg-opacity-25 p-2 rounded mb-3 border border-secondary">
                <img src={item.image} alt={item.name} className="rounded bg-white object-fit-contain" style={{ width: '50px', height: '50px' }} />
                <div className="flex-grow-1">
                  <h6 className="mb-0 fw-bold small text-truncate" style={{ maxWidth: '140px' }}>{item.name}</h6>
                  <small className="text-warning fw-bold d-block">Size: {item.selectedSize}</small>
                  <small className="text-success fw-bold">${item.price.toFixed(2)} x {item.quantity}</small>
                </div>
                <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item.id, item.selectedSize)}><FaTrash /></button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-top border-secondary pt-2">
            <div className="d-flex justify-content-between small mb-1"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="d-flex justify-content-between small text-warning mb-1"><span>Promotion (10%):</span><span>-${discount.toFixed(2)}</span></div>
            <div className="d-flex justify-content-between small mb-1"><span>Estimated Tax (15%):</span><span>${tax.toFixed(2)}</span></div>
            <div className="d-flex justify-content-between fs-5 fw-bold text-success pt-1 border-top border-secondary"><span>Order Total:</span><span>${grandTotal.toFixed(2)}</span></div>
            <button className="btn btn-success w-100 fw-bold mt-3" onClick={onCheckout}>Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;

