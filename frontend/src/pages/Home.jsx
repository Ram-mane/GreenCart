import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productService.getProducts({ limit: 6 });
        setFeaturedProducts(response.data.products);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Fresh • Organic • Delivered</h1>
          <p>Get the freshest organic groceries delivered right to your doorstep. Support local farmers and eat healthier with GreenCart.</p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">Shop Now</Link>
            <Link to="/about" className="btn btn-secondary">Learn More</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-placeholder">🥬🍎🥕</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose GreenCart?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🌱</div>
              <h3>100% Organic</h3>
              <p>All our products are certified organic and grown without harmful pesticides.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Get your groceries delivered fresh within 24 hours of ordering.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">👨‍🌾</div>
              <h3>Local Farmers</h3>
              <p>Support local farmers and communities by choosing locally sourced produce.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2>Featured Products</h2>
          {loading && <div className="loading">Loading products...</div>}
          {error && <div className="error">{error}</div>}
          {!loading && !error && (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    {product.organic && <span className="organic-badge">🌱 Organic</span>}
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-price">${product.price}</div>
                    <button className="btn btn-primary">Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="section-footer">
            <Link to="/products" className="btn btn-outline">View All Products</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;