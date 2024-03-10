const xlsx = require('xlsx');

const userSchema = require('./models/User');

require("dotenv").config(); //Se importan las variables de entorno.
const DB_URL = process.env.DB_URL || '';
const mongoose = require("mongoose"); //Importa la libería de mongoose.
mongoose.connect(DB_URL); //Crear la cadena de conexión con Atlas en este caso.

const bcrypt = require('bcrypt');  //Importa la librería de bcrypt.

const workbook = xlsx.readFile('datos.xlsx'); //=> Lee el archivo.
const sheet_list = workbook.SheetNames; //=> Obtenemos la lista de hojas del excel.
const firstSheet = sheet_list[0];// => Obtenemos la información de la primera hoja del excel.
const data = xlsx.utils.sheet_to_json(workbook.Sheets[firstSheet]); //=> Convertimos la información de la hoja de excel a formato JSON

//Se hashea la contraseña de cada usuario del excel.
for (const user of data) {
    user.email = user.email.trim().toLowerCase(); //=> Toma el valor de email y le elimina los espacios, además lo coloca en minúsculas.

    const hashedPassword = bcrypt.hashSync(user.password, 10); // => Se transforma la contraseña para que se hasheé
    user.password = hashedPassword; // => Se guarda la contraseña hasheada en la propiedad del usuario.

    /*Se crea una instancia de userSchema con los datos obtenidos en la iteración  */
    userSchema({
        userId : user.userId,
        name : user.name,
        lastname : user.lastname,
        email : user.email,
        password : hashedPassword
    }).save().then(() => {
        console.log("User uploaded : " + user.name); //=> Se muestra en la consola si el usuario se agregó
    }).catch((error) => {
        console.log("Error uploading user : " + user.name);//=> De lo contrario se muestra un error.
    })
}



/*Se sube la información a la base de datos pasándole el array */
// userSchema.insertMany(data).then(()=> {
//     console.log("Users entered successfully");
// }).catch(error => {
//     console.log("Users failed to enter ");
//     console.log(error);
// });


// console.log(data);