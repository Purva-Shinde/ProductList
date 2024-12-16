import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './ProductDashboard.css';
const ProductList = () => {
  const products = useSelector(state => state.products.products);

  return (
    <div className='ProductDadhboard'>
      <h1 >Product Inventory</h1>
      <div className='btnWrap'> 
      <button>  
        <Link to="/add-product">Add Product</Link>
      </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Total Cost</th>
            <th>Number of raw Materials</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td><Link to={`/update-product/${product.id}`}>{product.name}</Link></td>
              <td>{product.category}</td>
              <td>{product.totalCost}</td>
              <td>{product.materials.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
