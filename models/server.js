const express = require ('express');
const cors = require('cors');
const {dbConection} =require('../database/config');

class Server {
    constructor (){
        //config inicail
        this.app = express();
        this.port= process.env.PORT;
        this.categoriasPath= '/api/categoria';
        this.productosPath='/api/producto';
        this.usuarioPath='/api/usuario';
        this.authPath='/api/auth';
        this.facturaPath ='/api/factura';
        this.carritoPath = '/api/carrito';
        //conectar db
        this.conectarDB();

        //middlewares
        this.middlewares();

        //rutas de la app
        this.routes();

    }
    async conectarDB(){
        await dbConection();
    }
    //middleware, funcion que sucede antes de las rutas
    middlewares(){
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del Body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use(  express.static('public') );
    }

    routes(){
        this.app.use (this.categoriasPath,require('../routes/categoria'));
        this.app.use(this.productosPath,require('../routes/producto'));
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuarioPath, require('../routes/usuario'));
        this.app.use(this.facturaPath,require('../routes/factura'));
        this.app.use(this.carritoPath,require('../routes/carrito'));
    }
    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        } ) 
    }
}

module.exports= Server;