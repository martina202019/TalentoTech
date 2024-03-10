const express = require("express"); //Importa la librería.
const app = express(); //Inicialización de la variable que usará la librería.
const router = express.Router(); //Enrutar los servicios web.
const port = 9090; //Puerto por el que escuchará el servidor.
require("dotenv").config(); //Se importan las variables de entorno.
/*Web Sockets*/
const socket = require('socket.io'); //Importa la librería de socket.io
const http = require('http').Server(app);//Importa la librería http y configura el server con la variable app que es la que contiene todo el programa.
const io = socket(http);//Crea el servidor con el socket y le pasa la variable http.

/*Importar la librería sever de graphQL */
const { createYoga } = require('graphql-yoga');
const schema = require('./graphql/schema');

/*Configuración base de datos.*/
const DB_URL = process.env.DB_URL || '';
const mongoose = require("mongoose"); //Importa la libería de mongoose.
mongoose.connect(DB_URL); //Crear la cadena de conexión con Atlas en este caso.
/*Importación de las rutas  */
const userRoutes = require("./routes/UserRoutes");
const houseRoutes = require("./routes/HouseRoutes");
const messageRoutes = require('./routes/messageRoutes');
const departmentRoutes = require('./read_file');

const messageSchema = require('./models/Message');

//Métodos websocket
io.on('connect', (socket) => {
  console.log("Connected");
  //Con el metodo ON se escuchan eventos desde el servidor.
  socket.on('message', (data) => {
    /*Almacenando el mensaje en la base de datos*/
    let payload = JSON.parse(data);
    messageSchema(payload).save().then((result) => {
      console.log(payload.body);
      /*Aquí estoy enviando el mensaje a todos los clientes conectados al websocket*/
      socket.broadcast.emit('message-receipt', payload);
    }).catch((error) => {
      console.log("Error" + error.message);
    })
    //Con el metodo emit, se emiten eventos hacia el cliente.
    //En el postman para que funcione el servicio, se debe configurar como socket.io y configurarlo con http://localhost:9090
    
  });

  socket.on('disconnect', (socket) => {
    console.log("Disconnected");
  })

});
/*Configuracion express*/
app.use(express.urlencoded({ extended: true })); //Acceder a la información de las URLs.
app.use(express.json()); //Analizar información en formato JSON.
app.use((req, res, next) => {
  res.io = io;
  next();
})

const yoga = new createYoga({
  schema
});
app.use('/graphql', yoga);

/*Ejecuto el servidor*/
app.use(router);
app.use('/uploads', express.static('uploads'));
app.use("/", userRoutes);
app.use("/", houseRoutes);
app.use('/', messageRoutes);
app.use('/', departmentRoutes);
/*Ejecución del servidor */
http.listen(port, () => {
  console.log("Listen on port: " + port);
});

module.exports = http;
