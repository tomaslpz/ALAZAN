const express = require('express'); // Importa el módulo express para crear un servidor web
const mongoose = require('mongoose'); // Importa el módulo mongoose para interactuar con MongoDB
const cors = require('cors'); // Importa el módulo cors para permitir solicitudes de recursos cruzados
const bodyParser = require('body-parser'); // Importa el módulo body-parser para parsear cuerpos de solicitud
const productRoutes = require('./routes/productRoutes'); // Importa las rutas de productos desde otro archivo
const app = express(); // Crea una instancia de la aplicación express

const PORT = process.env.PORT || 5000; // Define el puerto en el que el servidor escuchará, usa el puerto de la variable de entorno o 5000 por defecto
const MONGODB_URI = 'mongodb://localhost:27017/inventory'; // Define la URI de conexión a la base de datos MongoDB

// Conecta a MongoDB usando mongoose
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected')) // Muestra un mensaje en la consola si la conexión es exitosa
  .catch(err => console.log('MongoDB connection error:', err)); // Muestra un mensaje de error en la consola si la conexión falla

app.use(cors()); // Usa cors para permitir solicitudes de recursos cruzados
app.use(bodyParser.json()); // Usa body-parser para parsear cuerpos de solicitud en formato JSON
app.use('/api/products', productRoutes); // Usa las rutas de productos para todas las solicitudes a /api/products

// Inicia el servidor en el puerto definido
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Muestra un mensaje en la consola indicando que el servidor está en funcionamiento
});
