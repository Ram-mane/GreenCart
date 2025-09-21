import { useState, useEffect } from 'react';
import { productService } from '../services';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    organic: '',
    search: '',
    inStock: ''
  });

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'herbs', label: 'Herbs' },
    { value: 'grains', label: 'Grains' },
    { value: 'dairy', label: 'Dairy' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.organic) params.organic = filters.organic;
      if (filters.search) params.search = filters.search;
      if (filters.inStock) params.inStock = filters.inStock;

      const response = await productService.getProducts(params);
      setProducts(response.data.products);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      organic: '',
      search: '',
      inStock: ''
    });
  };

  return (
    <div className="products">
      <div className="container">
        <h1>Our Products</h1>
        
        {/* Filters */}
        <div className="filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            
            <select
              value={filters.organic}
              onChange={(e) => handleFilterChange('organic', e.target.value)}
            >
              <option value="">All Products</option>
              <option value="true">Organic Only</option>
              <option value="false">Non-Organic</option>
            </select>
            
            <select
              value={filters.inStock}
              onChange={(e) => handleFilterChange('inStock', e.target.value)}
            >
              <option value="">All Stock Status</option>
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>
            
            <button onClick={clearFilters} className="btn btn-secondary">
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results */}
        {loading && <div className="loading">Loading products...</div>}
        {error && <div className="error">{error}</div>}
        
        {!loading && !error && (
          <>
            <div className="results-info">
              <p>Found {products.length} products</p>
            </div>
            
            {products.length === 0 ? (
              <div className="no-products">
                <p>No products found matching your criteria.</p>
                <button onClick={clearFilters} className="btn btn-primary">
                  View All Products
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {products.map((product) => (
                  <div key={product._id} className="product-card">
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                      {product.organic && <span className="organic-badge">🌱 Organic</span>}
                      {!product.inStock && <span className="stock-badge out-of-stock">Out of Stock</span>}
                    </div>
                    <div className="product-info">
                      <div className="product-category">{product.category}</div>
                      <h3>{product.name}</h3>
                      <p className="product-description">{product.description}</p>
                      <div className="product-tags">
                        {product.tags.map((tag, index) => (
                          <span key={index} className="tag">#{tag}</span>
                        ))}
                      </div>
                      <div className="product-footer">
                        <div className="product-price">${product.price}</div>
                        <button 
                          className="btn btn-primary" 
                          disabled={!product.inStock}
                        >
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;