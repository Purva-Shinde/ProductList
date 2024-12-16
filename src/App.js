import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDashboard from './Components/ProductDashboard';
import ProductForm from './Components/ProductForm';
import ProductUpdate from './Components/ProductUpdate';

function App() {
  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<ProductDashboard />} />
      <Route path="/add-product" element={<ProductForm />} />
      <Route path="/update-product/:id" element={<ProductUpdate />} />
    </Routes>
  </Router>

  );
}

export default App;
