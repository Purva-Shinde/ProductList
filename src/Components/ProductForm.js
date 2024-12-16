import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct, saveProduct } from '../Slice/ProductSlice';
import { useNavigate } from 'react-router-dom';
import './ProductForm.css'
const ProductForm = ({ match, initialProduct }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products); 
  const [product, setProduct] = useState(initialProduct || {
    id: match ? parseInt(match.params.id) : Date.now(),
    name: '',
    category: '',
    unit: '',
    expiry: '',
    totalCost: 0,
    materials: []
  });

  useEffect(() => {
    console.log('Products in Redux state:', products);
  }, [products]); 

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const addMaterial = () => {
    setProduct({
      ...product,
      materials: [...product.materials, { id: Date.now(), name: '', unit: '', quantity: 0, price: 0, total: 0, tax: 0 }]
    });
  };

  const handleMaterialChange = (index, field, value) => {
    const newMaterials = [...product.materials];
    newMaterials[index][field] = value;
  
     if (field === 'quantity' || field === 'price') {
      const updatedMaterial = { ...newMaterials[index] };
      updatedMaterial.total = updatedMaterial.quantity * updatedMaterial.price;
      updatedMaterial.tax = updatedMaterial.total * 0.10;  
      newMaterials[index] = updatedMaterial;
  
       const totalCost = newMaterials.reduce((sum, material) => sum + material.total, 0);
      setProduct({ ...product, materials: newMaterials, totalCost });
    } else {
      setProduct({ ...product, materials: newMaterials });
    }
  };
  

  const handleSaveProduct = () => {
    if (product.id) {
      dispatch(updateProduct(product));
      dispatch(saveProduct(product));  

    } else {
      dispatch(addProduct(product));
      dispatch(saveProduct(product));  

    }
    navigate('/'); 
  };

 

  return (
    <div className='produactForm' >
      <input type="text" 
      name="name" value={product.name} 
      onChange={handleInputChange} 
      placeholder="Product Name" required />
      <input type="text"
       name="category"
        value={product.category} 
        onChange={handleInputChange} 
        placeholder="Category" required />
      <input type="text"
       name="unit" 
       value={product.unit} 
       onChange={handleInputChange} 
       placeholder="Unit" required />
      <input type="date" 
      name="expiry" 
      value={product.expiry} 
      onChange={handleInputChange} 
      placeholder="Expiry Date" 
      required />
      
      <h2>Materials</h2>
      {product.materials.map((material, index) => (
        <div key={material.id}>
          <input type="text"
           name="name" value={material.name} 
           onChange={(e) => handleMaterialChange(index, 'name', e.target.value)}
            placeholder="Material Name" />
          <input type="text"
           name="unit" 
           value={material.unit} 
           onChange={(e) => handleMaterialChange(index, 'unit', e.target.value)}
            placeholder="Unit" />
          <input
           type="number"
            name="quantity" 
            value={material.quantity} onChange={(e) => handleMaterialChange(index, 'quantity', e.target.value)} 
            placeholder="Quantity" />
          <input
           type="number"
            name="price" value={material.price} onChange={(e) => handleMaterialChange(index, 'price', e.target.value)}
             placeholder="Price" />
          <p>Total: {material.total}</p>
          <p>Tax: {material.tax}</p>
        </div>
      ))}
      <div className='btnWrap'> 
      <button type="button" className=' ' onClick={addMaterial}>Add Material</button>

      <button type="submit" className=' ' onClick={handleSaveProduct}>Save Product</button>
      </div>
    </div>
  );
};

export default ProductForm;
