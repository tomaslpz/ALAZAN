const mongoose = require('mongoose'); // Importa el módulo mongoose para interactuar con MongoDB

// Define un esquema para el modelo de producto utilizando mongoose.Schema
// El esquema define la estructura de los documentos en la colección de productos
const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Campo 'name' de tipo String, es obligatorio
  description: String, // Campo 'description' de tipo String, no es obligatorio
  price: { type: Number, required: true }, // Campo 'price' de tipo Number, es obligatorio
  quantity: { type: Number, required: true } // Campo 'quantity' de tipo Number, es obligatorio
});

// Exporta el modelo 'Product' basado en productSchema
// 'Product' es el nombre del modelo y 'productSchema' es el esquema asociado
module.exports = mongoose.model('Product', productSchema);

