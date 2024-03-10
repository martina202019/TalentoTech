const request = require('supertest'); // Libreria para probar APIs
const app = require('../index.js'); // importando todas las rutas

const objectToTest = {
            "userId": 7845454,
            "name": "Luz",
            "lastname": "Nuñez",
            "email": "luz@correo.com",
            "password": "UsuarioPrueba"
        }
let userId;
let token; 

/** Descripcion de la Prueba */
// describe('GET /', () => {
//     /** Descripcion especifica del caso a probar */
//     it('responds with status 200', async () => {
//         /** Simulando la solicitud HTTP */
//         const response = await request(app).get('/');    
//         /** Defino los valores esperados */    
//         expect(response.status).toBe(200);
//     })
//     it('responds with test Hello world', async () => {
//         const response = await request(app).get('/');        
//         expect(response.text).toBe('Hello world');        
//     })
// })

// describe('GET /user', () => {
//     it('responds with status 200', async () => {
//         const response = await request(app).get('/user');              
//         expect(response.status).toBe(200);
//     })

//     it('responds with an array Object that contains an specific user', async () => {
//         const response = await request(app).get('/user');             
//         expect(Array.isArray(response.body)).toBe(true);
//     })
// })

describe('POST /user', () => {
    it('create a new user in the DB and response with the data', async () => {
        const response = await request(app).post('/user').send(objectToTest)
        /** Asignando el _id del usuario nuevo a la variable userId 
         *  para ser usanda en las otras pruebas */
        userId = response.body._id;

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('_id')
        expect(response.body.name).toBe(objectToTest.name)
        expect(response.body.lastname).toBe(objectToTest.lastname)
        expect(response.body.email).toBe(objectToTest.email)
    })
})

describe('GET /user/:id', () => {
    it('responds with an Object that contains an specific user', async () => {
        
        const response = await request(app).get('/user/'+ userId);      
        expect(response.status).toBe(200);
        expect(typeof response.body === "object").toBe(true);
        expect(response.body).toHaveProperty('_id')
        expect(response.body.name).toBe(objectToTest.name)
        expect(response.body.lastname).toBe(objectToTest.lastname)
        expect(response.body.email).toBe(objectToTest.email)
    })
})

describe('POST /login', () => {
    it('Success login with email and password', async () => {        

        const response = await request(app).post('/login').send(objectToTest)

        token = response.body.token;
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('token')
        expect(response.body.status).toBe("success")
    })

    it('Error login with email and password', async () => {
        const user = {
            "email": "lucia-pardo10@correo.com",
            "password": "UsuarioDePrueba1111"
        }

        const response = await request(app).post('/login').send(user)

        expect(response.statusCode).toBe(401)
        expect(response.body).not.toHaveProperty('token')
        expect(response.body.status).toBe("error")
    })
})

describe('POST /delete', () => {
    it('Success delete with _id', async () => {        
        const response = await request(app).delete('/user/'+ userId)
                                        .set('Authorization', 'Bearer ' + token)
        expect(response.statusCode).toBe(200)
        expect(response.body.status).toBe("success")
    })
})