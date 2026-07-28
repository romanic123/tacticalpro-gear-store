import React, { useState } from 'react';
import { FaLock, FaEnvelope, FaCreditCard, FaCcVisa, FaCcMastercard, FaCcAmex, FaCheckCircle, FaChevronRight, FaShieldAlt } from 'react-icons/fa';

function CheckoutGateway({ step, setStep, grandTotal, clearCart }) {
  const [emailInput, setEmailInput] = useState('');
  const [cardInput, setCardInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!emailInput || !cardInput) return;
    
    const mockCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(mockCode);
    setOtpError('');
    setStep('otp');
    
    alert(`[TACTICALPRO SECURE SERVER]\n\nVerification OTP transmitted to: ${emailInput}\n\nYour 6-Digit authorization code is: ${mockCode}`);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpInput === generatedOtp) {
      setStep('success');
      clearCart(); 
    } else {
      setOtpError('The verification code you entered is invalid. Please double check and try again.');
    }
  };

  if (step === 'none') return null;

  return (
    <div className="amazon-checkout-overlay animate-fade-in">
      
      {/* PHASE 1: STANDARD CARD INFORMATION COLLECTOR VIEW */}
      {step === 'form' && (
        <div className="amazon-checkout-container bg-white rounded shadow-sm border border-secondary border-opacity-25">
          <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
            {/* BRANDING UPGRADE: Swapped out Amazon for TacticalPro */}
            <div className="d-flex align-items-center gap-2">
              <span className="fs-4 fw-bold text-success d-flex align-items-center gap-2">
                <FaShieldAlt /> TACTICALPRO
              </span>
              <span className="text-secondary small pt-1 font-monospace">| Secure Checkout</span>
            </div>
            <button type="button" className="btn-close btn-sm" onClick={() => setStep('none')}></button>
          </div>

          <div className="row g-4">
            <div className="col-md-7">
              <h4 className="fw-normal text-dark mb-3 fs-5">Select a payment method</h4>
              <div className="p-3 border rounded bg-light bg-opacity-50 border-success mb-4 shadow-sm" style={{ borderLeftWidth: '4px' }}>
                <span className="small text-uppercase text-success fw-bold d-block mb-1">
                  <FaLock className="me-1" /> Military Grade Security Active
                </span>
                <p className="text-muted small mb-0">Your card credentials remain tokenized inside our encrypted sandbox layers.</p>
              </div>

              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label className="form-label small text-dark fw-bold mb-1">E-mail (for order confirmation verification)</label>
                  <div className="input-group input-group-sm">
                    <span className="input-group-text bg-light text-secondary"><FaEnvelope /></span>
                    <input type="email" className="form-control" placeholder="username@domain.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label small text-dark fw-bold mb-1">Credit or Debit Card Number</label>
                  <div className="input-group input-group-sm">
                    <span className="input-group-text bg-light text-secondary"><FaCreditCard /></span>
                    <input type="text" className="form-control" placeholder="4111 2222 3333 4444" maxLength="19" value={cardInput} onChange={(e) => setCardInput(e.target.value)} required />
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2 text-muted mb-4 border-top pt-3 small">
                  <span>Accepted cards:</span>
                  <div className="fs-4 d-flex gap-2 text-secondary opacity-75">
                    <FaCcVisa /><FaCcMastercard /><FaCcAmex />
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button type="button" className="btn btn-sm btn-light border px-3 text-dark small" onClick={() => setStep('none')}>Cancel</button>
                  {/* Styled button button to match our tactical green brand theme */}
                  <button type="submit" className="btn btn-sm btn-success px-4 fw-bold text-white shadow-sm">
                    Continue to Verification <FaChevronRight className="small ms-1" style={{ fontSize: '10px' }} />
                  </button>
                </div>
              </form>
            </div>

            <div className="col-md-5">
              <div className="p-3 bg-light border rounded shadow-sm text-dark">
                <h5 className="fw-bold fs-6 border-bottom pb-2 mb-3">Order Summary</h5>
                <div className="d-flex justify-content-between small text-muted mb-1">
                  <span>Items:</span>
                  <span>Calculated inside cart</span>
                </div>
                <div className="d-flex justify-content-between small text-success mb-1">
                  <span>Promotion Discount:</span>
                  <span>-10% Active</span>
                </div>
                <div className="d-flex justify-content-between small text-muted mb-2 border-bottom pb-2">
                  <span>Shipping &amp; handling:</span>
                  <span className="text-success fw-bold">FREE Shipping</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="fw-bold text-danger fs-5">Order Total:</span>
                  <span className="fw-bold text-danger fs-5">${grandTotal.toFixed(2)}</span>
                </div>
                <p className="text-muted" style={{ fontSize: '11px', lineHeight: '1.3' }}>By continuing, you agree to TacticalPro's conditions of use, security policies, and deployment rules.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2: SECURITY EMAIL OTP TOKEN CONFIRMATION SHEET */}
      {step === 'otp' && (
        <div className="amazon-checkout-container bg-white rounded shadow-sm border p-4 text-dark text-center" style={{ maxWidth: '380px' }}>
          <div className="text-start mb-3 border-bottom pb-2">
            <span className="fs-5 fw-bold text-success font-sans-serif">TACTICALPRO</span>
            <span className="text-success small ps-1 fw-bold">| Verification Required</span>
          </div>
          
          <form onSubmit={handleVerifyOtp}>
            <p className="small text-secondary text-start mb-3">
              To safeguard your account metrics, we sent a 6-digit dynamic authentication token code to: <br/>
              <strong className="text-dark d-block text-center mt-1">{emailInput}</strong>
            </p>
            
            <div className="mb-3 mx-auto" style={{ maxWidth: '200px' }}>
              <input type="text" className="form-control text-center fs-4 fw-bold font-monospace border-success shadow-sm" placeholder="000000" maxLength="6" value={otpInput} onChange={(e) => setOtpInput(e.target.value)} required />
            </div>

            {otpError && <div className="text-danger small mb-3 fw-bold">{otpError}</div>}

            <p className="text-muted text-start" style={{ fontSize: '11px' }}>Check your email inbox. If it does not arrive within 60 seconds, check your connection options.</p>
            
            <div className="d-flex justify-content-between pt-3 border-top mt-3">
              <button type="button" className="btn btn-sm btn-light border text-dark" onClick={() => setStep('form')}>Change Details</button>
              <button type="submit" className="btn btn-sm btn-success fw-bold text-white shadow-sm px-4">Verify Order</button>
            </div>
          </form>
        </div>
      )}

      {/* PHASE 3: VERIFIED SEAMLESS TRANSACTION COMPLETION SUCCESS WINDOW */}
      {step === 'success' && (
        <div className="amazon-checkout-container bg-white rounded shadow-sm border p-4 text-center text-dark" style={{ maxWidth: '400px' }}>
          <div className="text-success fs-1 mb-2"><FaCheckCircle /></div>
          <h4 className="fw-bold text-success mb-2 fs-5">Thank you, your order is placed!</h4>
          <p className="small text-muted mb-3">An itemized receipt structure, tracking parameters, and delivery confirmation file have been emailed straight to:</p>
          <div className="bg-light p-2 rounded text-dark font-monospace small mb-4 border border-opacity-50">{emailInput}</div>
          <button type="button" className="btn btn-sm btn-success text-white w-100 fw-bold py-2 shadow-sm" onClick={() => setStep('none')}>CONTINUE SHOPPING</button>
        </div>
      )}

    </div>
  );
}

export default CheckoutGateway;
