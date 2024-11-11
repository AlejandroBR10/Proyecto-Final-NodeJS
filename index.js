//Dependencies
const morgan = require('morgan');
const express = require("express");
const app = express();
//Routers
const empleado = require('./routes/empleado');
const admin = require('./routes/admin');
//Middleware
const auth = require('./middleware/auth')
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('cors');

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/*
Verbos HTTP
GET - obtener recursos
POST - almacenar/crear recursos   
PUT - modificar un recurso completo
PATCH - modificar una parte recurso
DELETE - borrar un recurso
*/

app.get("/", index );
app.use("/admin", admin);
app.use("/empleado", empleado);
app.use(auth);

app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});


