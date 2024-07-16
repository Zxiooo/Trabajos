import React, { useState, useEffect } from 'react';
import '../css/PanelAdmin.css';
import logo from '../imagenes/logo.png';

const PanelAdmin = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [isOnSale, setIsOnSale] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    setCategories(storedCategories);

    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const addProduct = () => {
    if (!productName || !productPrice || !productCategory) {
      alert('Nombre del producto, precio y categoría son campos obligatorios.');
      return;
    }

    if (!categories.includes(productCategory)) {
      alert('Por favor, inserta la categoría antes de seleccionarla para el producto.');
      return;
    }

    const newProduct = {
      id: new Date().getTime(),
      name: productName,
      price: productPrice,
      category: productCategory,
      onSale: isOnSale
    };

    const updatedProducts = [...products, newProduct];
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);

    setProductName('');
    setProductPrice('');
    setProductCategory('');
    setIsOnSale(false);
  };

  const deleteProduct = (productId) => {
    const confirmation = window.confirm('¿Estás seguro que quieres eliminar el producto?');
    if (confirmation) {
      const updatedProducts = products.filter(product => product.id !== productId);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
    }
  };

  const prepareEditProduct = (productId) => {
    const productToEdit = products.find(product => product.id === productId);
    if (productToEdit) {
      setEditingProductId(productId);
      setProductName(productToEdit.name);
      setProductPrice(productToEdit.price);
      setProductCategory(productToEdit.category);
      setIsOnSale(productToEdit.onSale);
    }
  };

  const saveEditedProduct = () => {
    const updatedProducts = products.map(product => {
      if (product.id === editingProductId) {
        return {
          ...product,
          name: productName,
          price: productPrice,
          category: productCategory,
          onSale: isOnSale
        };
      }
      return product;
    });

    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);

    setEditingProductId(null);
    setProductName('');
    setProductPrice('');
    setProductCategory('');
    setIsOnSale(false);
  };

  const cancelEdit = () => {
    setEditingProductId(null);
    setProductName('');
    setProductPrice('');
    setProductCategory('');
    setIsOnSale(false);
  };

  const addCategory = () => {
    if (!categoryName) {
      alert('El nombre de categoría es obligatorio.');
      return;
    }

    if (categories.includes(categoryName)) {
      alert('La categoría ya existe.');
      return;
    }

    const updatedCategories = [...categories, categoryName];
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    setCategories(updatedCategories);

    setCategoryName('');
  };

  const deleteCategory = (categoryName) => {
    const confirmation = window.confirm(`¿Estás seguro que quieres eliminar la categoría "${categoryName}" y sus productos?`);
    if (confirmation) {
      const updatedCategories = categories.filter(category => category !== categoryName);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      setCategories(updatedCategories);

      const updatedProducts = products.filter(product => product.category !== categoryName);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
    }
  };

  const editCategory = (categoryName) => {
    setEditingCategoryId(categoryName);
    setCategoryName(categoryName);
  };

  const saveEditedCategory = () => {
    if (!categoryName) {
      alert('El nombre de categoría es obligatorio.');
      return;
    }

    const updatedCategories = categories.map(category => {
      if (category === editingCategoryId) {
        return categoryName;
      }
      return category;
    });

    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    setCategories(updatedCategories);

    const updatedProducts = products.map(product => {
      if (product.category === editingCategoryId) {
        return {
          ...product,
          category: categoryName
        };
      }
      return product;
    });

    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);

    setEditingCategoryId(null);
    setCategoryName('');
  };

  const cancelEditCategory = () => {
    setEditingCategoryId(null);
    setCategoryName('');
  };

  const limpiarLocalStorage = () => {
    const confirmacion = window.confirm('¿Estás seguro de limpiar el LocalStorage? Esta acción no se puede deshacer.');
    if (confirmacion) {
      localStorage.removeItem('products');
      localStorage.removeItem('categories');
      setProducts([]);
      setCategories([]);
      alert('LocalStorage limpiado.');
    }
  };

  return (
    <div>
      <header>
        <div className="head-logo">
          <img src={logo} alt="Logo de la Empresa"/>
          <h3 className="head-titulo">RealityFiction3D</h3>
        </div>
        <nav>
          <a href="../html/login.html" className="nav-link">Salir</a>
        </nav>
      </header>
      <h2 className='titulo-admin'>Panel de Administrador</h2>
      <div className="admin-container">
        <div className="product-form">
          <h3>Agregar Producto</h3>
          <label>Nombre del Producto:</label>
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} /><br />
          <label>Precio:</label>
          <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} /><br />
          <label>Categoría:</label>
          <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
            <option value="">Selecciona una categoría</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select><br />
          <label>
            En Oferta:
            <input type="checkbox" checked={isOnSale} onChange={() => setIsOnSale(!isOnSale)} />
          </label><br />
          {editingProductId !== null ? (
            <div>
              <button onClick={saveEditedProduct}>Guardar Cambios</button>
              <button onClick={cancelEdit}>Cancelar</button>
            </div>
          ) : (
            <button onClick={addProduct}>Agregar Producto</button>
          )}
        </div>
        <div className="product-form">
          <h3>{editingCategoryId ? 'Editar Categoría' : 'Agregar Categoría'}</h3>
          <label>Nombre de la Categoría:</label>
          <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} /><br />
          {editingCategoryId !== null ? (
            <div>
              <button onClick={saveEditedCategory}>Guardar Cambios</button>
              <button onClick={cancelEditCategory}>Cancelar</button>
            </div>
          ) : (
            <button onClick={addCategory}>Agregar Categoría</button>
          )}
        </div>
        <div className="product-item">
          <button className="delete-btn" onClick={limpiarLocalStorage}>Limpiar LocalStorage</button>
        </div>
        <hr />
        <div>
          <h3>Categorías</h3>
          <table className="product-list">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{category}</td>
                  <td>
                    <button className="delete-btn" onClick={() => deleteCategory(category)}>Eliminar</button>
                    <button className="edit-btn" onClick={() => editCategory(category)}>Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3>Productos</h3>
          <table className="product-list">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>En Oferta</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.onSale ? 'Sí' : 'No'}</td>
                  <td>
                    <button className="delete-btn" onClick={() => deleteProduct(product.id)}>Eliminar</button>
                    <button className="edit-btn" onClick={() => prepareEditProduct(product.id)}>Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PanelAdmin;
