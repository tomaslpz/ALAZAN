import axios from 'axios'; // Importa la biblioteca axios para hacer solicitudes HTTP

const API_URL = 'http://localhost:5000/api/products'; // Define la URL base del API backend para los productos

// Define y exporta una función llamada getProducts que realiza una solicitud GET a la URL base del API
// Esta función se utiliza para obtener la lista de todos los productos.
export const getProducts = async () => {
  console.log('Fetching all products'); // Debugging
  try {
    const response = await axios.get(API_URL);
    console.log('Products fetched successfully:', response.data); // Debugging
    return response;
  } catch (error) {
    console.error('Error fetching products:', error); // Debugging
    throw error;
  }
};

// Define y exporta una función llamada getProduct que toma un parámetro id
// Realiza una solicitud GET a la URL específica de un producto añadiendo el ID a la URL base del API
// Esta función se utiliza para obtener un producto específico por su ID.
export const getProduct = async (id) => {
  console.log(`Fetching product with ID: ${id}`); // Debugging
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log('Product fetched successfully:', response.data); // Debugging
    return response;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error); // Debugging
    throw error;
  }
};

// Define y exporta una función llamada createProduct que toma un objeto product
// Realiza una solicitud POST a la URL base del API, enviando el objeto product en el cuerpo de la solicitud
// Esta función se utiliza para crear un nuevo producto.
export const createProduct = async (product) => {
  console.log('Creating product:', product); // Debugging
  try {
    const response = await axios.post(API_URL, product);
    console.log('Product created successfully:', response.data); // Debugging
    return response;
  } catch (error) {
    console.error('Error creating product:', error); // Debugging
    throw error;
  }
};

// Define y exporta una función llamada updateProduct que toma un parámetro id y un objeto product
// Realiza una solicitud PUT a la URL específica de un producto añadiendo el ID a la URL base del API
// Envía el objeto product en el cuerpo de la solicitud
// Esta función se utiliza para actualizar un producto existente por su ID.
export const updateProduct = async (id, product) => {
  console.log(`Updating product with ID: ${id}`, product); // Debugging
  try {
    const response = await axios.put(`${API_URL}/${id}`, product);
    console.log('Product updated successfully:', response.data); // Debugging
    return response;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error); // Debugging
    throw error;
  }
};

// Define y exporta una función llamada deleteProduct que toma un parámetro id
// Realiza una solicitud DELETE a la URL específica de un producto añadiendo el ID a la URL base del API
// Esta función se utiliza para eliminar un producto existente por su ID.
export const deleteProduct = async (id) => {
  console.log(`Deleting product with ID: ${id}`); // Debugging
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log('Product deleted successfully'); // Debugging
    return response;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error); // Debugging
    throw error;
  }
};
