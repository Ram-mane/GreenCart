import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🌱 GreenCart</h3>
            <p>Your trusted partner for fresh, organic groceries delivered right to your door.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Categories</h4>
            <ul>
              <li><a href="/products?category=fruits">Fruits</a></li>
              <li><a href="/products?category=vegetables">Vegetables</a></li>
              <li><a href="/products?category=herbs">Herbs</a></li>
              <li><a href="/products?category=dairy">Dairy</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>📧 hello@greencart.com</p>
            <p>📞 +1 (555) 123-4567</p>
            <p>📍 123 Green Street, EcoCity</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 GreenCart. All rights reserved. | Made with ❤️ for a greener future</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;