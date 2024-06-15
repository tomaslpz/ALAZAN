import React, { useState, useEffect } from 'react'; // Importa React y los hooks useState y useEffect desde la biblioteca react
import { getProducts, createProduct, updateProduct, deleteProduct } from './services/productService'; // Importa las funciones para interactuar con el API de productos
import './App.css'; // Importa el archivo de estilos CSS

function App() {
  // Define el estado para almacenar la lista de productos
  const [products, setProducts] = useState([]);
  // Define el estado para el formulario de producto
  const [form, setForm] = useState({ name: '', description: '', price: '', quantity: '' });
  // Define el estado para saber si se está editando un producto
  const [editing, setEditing] = useState(false);
  // Define el estado para almacenar el ID del producto que se está editando
  const [currentProductId, setCurrentProductId] = useState(null);

  // useEffect se ejecuta una vez cuando el componente se monta
  // Llama a loadProducts para cargar la lista de productos
  useEffect(() => {
    loadProducts();
  }, []);

  // Función para cargar la lista de productos desde el backend
  const loadProducts = async () => {
    console.log('Loading products...'); // Debugging
    const response = await getProducts(); // Llama a getProducts para obtener la lista de productos
    console.log('Products loaded:', response.data); // Debugging
    setProducts(response.data); // Actualiza el estado products con los datos recibidos
  };

  // Maneja el cambio en los campos del formulario
  const handleChange = (e) => {
    console.log('Form change:', e.target.name, e.target.value); // Debugging
    setForm({ ...form, [e.target.name]: e.target.value }); // Actualiza el estado form con los valores ingresados en el formulario
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    if (editing) {
      // Si se está editando un producto existente
      console.log('Updating product:', currentProductId, form); // Debugging
      await updateProduct(currentProductId, form); // Llama a updateProduct para actualizar el producto
    } else {
      // Si se está creando un nuevo producto
      console.log('Creating product:', form); // Debugging
      await createProduct(form); // Llama a createProduct para crear el nuevo producto
    }
    setForm({ name: '', description: '', price: '', quantity: '' }); // Resetea el formulario
    setEditing(false); // Cambia el estado editing a false
    setCurrentProductId(null); // Resetea el ID del producto actual
    loadProducts(); // Recarga la lista de productos
  };


  const handleEdit = (product) => {
    setForm(product);
    setEditing(true);
    setCurrentProductId(product._id); // Utiliza `_id` si así está definido en el modelo
    console.log('Editing product with ID:', product._id); // Log para verificar el ID del producto que se edita
  };
  

  // Maneja la eliminación de un producto
  const handleDelete = async (id) => {
    console.log('Deleting product with ID:', id); // Debugging
    await deleteProduct(id); // Llama a deleteProduct para eliminar el producto
    loadProducts(); // Recarga la lista de productos
  };

  return (
    <div className="App">
      <h1>Alazán Inventory</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
        <button type="submit">{editing ? 'Update' : 'Add'} Product</button>
      </form>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <div className="product-info">
              {product.name} - {product.description} - ${product.price} - Qty: {product.quantity}
            </div>
            <div className="product-actions">
              <button onClick={() => handleEdit(product)}>Edit</button>
              <button onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default App; // Exporta el componente App como el componente principal de la aplicación

