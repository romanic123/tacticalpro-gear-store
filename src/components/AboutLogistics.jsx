import React from 'react';
import { FaBuilding, FaStar, FaQuestionCircle, FaTruck, FaShieldAlt, FaClock } from 'react-icons/fa';

function AboutLogistics() {
  return (
    <div className="container mt-5 pt-4">
      {/* Main Info Card */}
      <div className="p-5 bg-white rounded shadow-sm border mb-5">
        <h2 className="fw-bold border-start border-success border-4 ps-3 mb-4">About Our Logistics Platform</h2>
        <p className="text-secondary lead mb-0">
          Established in 2026, TacticalPro Gear is an authorized distributor of advanced technical apparel and certified physical protection systems. We manage a fully streamlined supply chain to satisfy precise specifications across mission sectors.
        </p>
      </div>

      {/* Partnering Companies Section */}
      <section className="mb-5">
        <h4 className="fw-bold text-dark border-start border-success border-4 ps-3 mb-4 d-flex align-items-center gap-2">
          <FaBuilding className="text-success" /> Partnering Strategic Alliances
        </h4>
        <div className="row g-3 text-center">
          <div className="col-md-3">
            <div className="p-4 bg-dark text-white rounded border border-secondary shadow-sm">
              <h6 className="fw-bold text-success mb-1">Apex Textiles</h6>
              <small className="text-muted font-monospace">Cordura Sourcing</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-4 bg-dark text-white rounded border border-secondary shadow-sm">
              <h6 className="fw-bold text-success mb-1">Titanium Forgings</h6>
              <small className="text-muted font-monospace">Alloy Composites</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-4 bg-dark text-white rounded border border-secondary shadow-sm">
              <h6 className="fw-bold text-success mb-1">Vanguard Freight</h6>
              <small className="text-muted font-monospace">Global Logistics</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-4 bg-dark text-white rounded border border-secondary shadow-sm">
              <h6 className="fw-bold text-success mb-1">SecureTransit Corp</h6>
              <small className="text-muted font-monospace">Armored Fulfillment</small>
            </div>
          </div>
        </div>
      </section>

      {/* Operator Reviews Section */}
      <section className="mb-5">
        <h4 className="fw-bold text-dark border-start border-success border-4 ps-3 mb-4 d-flex align-items-center gap-2">
          <FaStar className="text-success" /> Verified Field Operator Evaluations
        </h4>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="p-4 bg-white rounded border shadow-sm">
              <div className="text-warning mb-2"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></div>
              <h6 className="fw-bold text-dark mb-1">Officer J. Vance</h6>
              <small className="text-muted d-block mb-2 font-monospace">Metro Security Agency</small>
              <p className="text-secondary small mb-0">"The quick-release system layout on the modular vests is exceptional. It handles friction loads flawlessly while staying responsive."</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-4 bg-white rounded border shadow-sm">
              <div className="text-warning mb-2"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></div>
              <h6 className="fw-bold text-dark mb-1">Sarah K.</h6>
              <small className="text-muted d-block mb-2 font-monospace">Wilderness Search & Rescue</small>
              <p className="text-secondary small mb-0">"Waterproofing thresholds on the Alpha combat boots survived structural field saturation tests across mountain terrains."</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Accordion Section */}
      <section className="mb-5">
        <h4 className="fw-bold text-dark border-start border-success border-4 ps-3 mb-4 d-flex align-items-center gap-2">
          <FaQuestionCircle className="text-success" /> Frequently Asked Questions (FAQ)
        </h4>
        <div className="accordion border rounded shadow-sm overflow-hidden" id="faqAccordion">
          <div className="accordion-item border-0 border-bottom">
            <h2 className="accordion-header">
              <button className="accordion-button bg-white text-dark fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                <FaTruck className="text-success me-2" /> What are the delivery dispatch timeframes?
              </button>
            </h2>
            <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
              <div className="accordion-body bg-light text-secondary small">
                All processed inventory components clear packing queues within 24 hours. Standard delivery routes arrive within 3 business days.
              </div>
            </div>
          </div>

          <div className="accordion-item border-0 border-bottom">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed bg-white text-dark fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                <FaShieldAlt className="text-success me-2" /> Are your apparel materials officially field-rated?
              </button>
            </h2>
            <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body bg-light text-secondary small">
                Yes. Every item in the catalog utilizes certified abrasion-resistant composites engineered for law enforcement and outdoor safety.
              </div>
            </div>
          </div>

          <div className="accordion-item border-0">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed bg-white text-dark fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                <FaClock className="text-success me-2" /> How can I file an engineering warranty claim?
              </button>
            </h2>
            <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body bg-light text-secondary small">
                We support a comprehensive 12-month materials replacement integrity warranty. Please contact our helpdesk with your digital checkout order number.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutLogistics;
