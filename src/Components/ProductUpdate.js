import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductForm from './ProductForm';

const ProductUpdate = () => {
  const { id } = useParams();
  const product = useSelector(state => state.products.products.find(p => p.id === parseInt(id)));

  return (
    <div>
      <h1>Update Product</h1>
      <ProductForm match={{ params: { id } }} initialProduct={product} />
    </div>
  );
};

export default ProductUpdate;
