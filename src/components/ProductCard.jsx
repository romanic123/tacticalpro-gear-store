import React, { useState } from 'react';

function ProductCard({ product, onAddToCart }) {
  const [showModal, setShowModal] = useState(false);
  const [isModalImageHovered, setIsModalImageHovered] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: '50%', y: '50%' });
  
  // Track selected size layout state
  const [selectedSize, setSelectedSize] = useState('M');

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const xPercentage = ((e.clientX - left) / width) * 100;
    const yPercentage = ((e.clientY - top) / height) * 100;
    setZoomOrigin({ x: `${xPercentage}%`, y: `${yPercentage}%` });
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 bg-dark text-white border-secondary shadow-sm">
        <div 
          className="overflow-hidden bg-white border-bottom border-secondary d-flex align-items-center justify-content-center"
          style={{ height: '230px', cursor: 'pointer' }}
          onClick={() => setShowModal(true)}
        >
          <img src={product.image} alt={product.name} className="img-fluid" style={{ maxHeight: '100%', objectFit: 'contain' }} />
        </div>

        <div className="card-body d-flex flex-column text-center">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="badge bg-secondary text-uppercase">{product.category}</span>
            <h5 className="text-success fw-bold mb-0">${product.price.toFixed(2)}</h5>
          </div>
          <h5 className="card-title fw-bold">{product.name}</h5>
          <p className="card-text text-light-50 small flex-grow-1">{product.description}</p>
          
          {/* PRODUCT SELECTION VARIANT PICKER */}
          <div className="mb-3 d-flex align-items-center justify-content-center gap-2">
            <label className="small text-muted text-uppercase fw-bold m-0">Size:</label>
            <select 
              className="form-select form-select-sm bg-dark text-white border-secondary w-auto font-monospace"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {product.sizes.map((sz) => (
                <option key={sz} value={sz}>{sz}</option>
              ))}
            </select>
          </div>
          
          <button 
            className="btn btn-success w-100 fw-bold" 
            onClick={() => onAddToCart({ ...product, selectedSize })} // Passes the selected size string along up to cart state
          >
            Add to Cart
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1060 }} onClick={() => { setShowModal(false); setIsModalImageHovered(false); }}>
          <div className="modal-dialog modal-dialog-centered modal-md" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content bg-dark border-secondary text-white">
              <div className="modal-header border-secondary p-2 d-flex justify-content-between align-items-center">
                <span className="fw-bold ps-2">{product.name} - Precision View</span>
                <button type="button" className="btn-close btn-close-white pe-3" onClick={() => { setShowModal(false); setIsModalImageHovered(false); }}></button>
              </div>
              <div className="modal-body p-0 bg-white d-flex justify-content-center align-items-center overflow-hidden" style={{ height: '400px', cursor: 'zoom-in' }} onMouseEnter={() => setIsModalImageHovered(true)} onMouseLeave={() => setIsModalImageHovered(false)} onMouseMove={handleMouseMove}>
                <img src={product.image} alt={product.name} className="img-fluid" style={{ maxHeight: '100%', objectFit: 'contain', transition: isModalImageHovered ? 'none' : 'transform 0.3s ease', transformOrigin: `${zoomOrigin.x} ${zoomOrigin.y}`, transform: isModalImageHovered ? 'scale(2.2)' : 'scale(1)' }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
