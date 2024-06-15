const express = require('express'); // Importa el módulo express para crear el router
const router = express.Router(); // Crea una instancia del router de Express
const Product = require('../models/Product'); // Importa el modelo Product para interactuar con la base de datos

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Utiliza el modelo Product para encontrar todos los productos
    console.log('Products retrieved:', products); // Loguea los productos recuperados en la consola
    res.json(products); // Envía la lista de productos en formato JSON como respuesta
  } catch (error) {
    console.error('Error retrieving products:', error); // Loguea cualquier error en la consola si ocurre al recuperar productos
    res.status(500).json({ error: 'Failed to retrieve products' }); // Envía un mensaje de error en caso de falla
  }
});

// Ruta para obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Utiliza el modelo Product para encontrar un producto por su ID
    if (!product) {
      console.log(`Product with ID ${req.params.id} not found`); // Loguea si no se encuentra un producto con el ID especificado
      return res.status(404).json({ error: 'Product not found' }); // Envía un mensaje de error si no se encuentra el producto
    }
    console.log('Product retrieved:', product); // Loguea el producto recuperado en la consola
    res.json(product); // Envía el producto encontrado en formato JSON como respuesta
  } catch (error) {
    console.error('Error retrieving product:', error); // Loguea cualquier error en la consola si ocurre al recuperar el producto
    res.status(500).json({ error: 'Failed to retrieve product' }); // Envía un mensaje de error en caso de falla
  }
});

// Ruta para crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body); // Crea una nueva instancia de Product con los datos del cuerpo de la solicitud
    const savedProduct = await newProduct.save(); // Guarda el nuevo producto en la base de datos
    console.log('Product created:', savedProduct); // Loguea el producto creado en la consola
    res.json(savedProduct); // Envía el producto guardado en formato JSON como respuesta
  } catch (error) {
    console.error('Error creating product:', error); // Loguea cualquier error en la consola si ocurre al crear el producto
    res.status(500).json({ error: 'Failed to create product' }); // Envía un mensaje de error en caso de falla
  }
});

// Ruta para actualizar un producto
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Actualiza un producto existente por su ID con los datos del cuerpo de la solicitud
    if (!updatedProduct) {
      console.log(`Product with ID ${req.params.id} not found for update`); // Loguea si no se encuentra un producto con el ID especificado para actualizar
      return res.status(404).json({ error: 'Product not found' }); // Envía un mensaje de error si no se encuentra el producto
    }
    console.log('Product updated:', updatedProduct); // Loguea el producto actualizado en la consola
    res.json(updatedProduct); // Envía el producto actualizado en formato JSON como respuesta
  } catch (error) {
    console.error('Error updating product:', error); // Loguea cualquier error en la consola si ocurre al actualizar el producto
    res.status(500).json({ error: 'Failed to update product' }); // Envía un mensaje de error en caso de falla
  }
});

// Ruta para eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id); // Elimina un producto existente por su ID
    if (!deletedProduct) {
      console.log(`Product with ID ${req.params.id} not found for deletion`); // Loguea si no se encuentra un producto con el ID especificado para eliminar
      return res.status(404).json({ error: 'Product not found' }); // Envía un mensaje de error si no se encuentra el producto
    }
    console.log('Product deleted:', deletedProduct); // Loguea el producto eliminado en la consola
    res.json({ message: 'Product deleted' }); // Envía un mensaje de éxito en formato JSON indicando que el producto ha sido eliminado
  } catch (error) {
    console.error('Error deleting product:', error); // Loguea cualquier error en la consola si ocurre al eliminar el producto
    res.status(500).json({ error: 'Failed to delete product' }); // Envía un mensaje de error en caso de falla
  }
});

module.exports = router; // Exporta el router para ser utilizado en la aplicación principal de Express
