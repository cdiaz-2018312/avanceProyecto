const { response, request } = require('express');
const bcrypt = require('bcryptjs');
//Importación del modelo
const Usuario = require('../models/usuario');

const getUsuarios = async (req = request, res = response) => {

    //condiciones del get
    const query = { estado: true };

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        msg: 'get Api - Controlador Usuario',
        listaUsuarios
    });

}

const postClient = async (req = request, res = response) => {
    const rol = 'CLIENT_ROLE';
    //Desestructuración
    const { nombre, correo, password } = req.body;
    const usuarioGuardadoDB = new Usuario({ nombre, correo, password, rol });

    //Encriptar password
    const salt = bcrypt.genSaltSync();
    usuarioGuardadoDB.password = bcrypt.hashSync(password, salt);

    //Guardar en BD
    await usuarioGuardadoDB.save();

    res.json({
        msg: 'Post Api - Post Usuario',
        usuarioGuardadoDB
    });

}

const postAdmin = async (req = request, res = response) => {
    rol = "ADMIN_ROLE";
    //Desestructuración
    const { nombre, correo, password } = req.body;
    const usuarioGuardadoDB = new Usuario({ nombre, correo, password, rol });

    //Encriptar password
    const salt = bcrypt.genSaltSync();
    usuarioGuardadoDB.password = bcrypt.hashSync(password, salt);

    //Guardar en BD
    await usuarioGuardadoDB.save();

    res.json({
        msg: 'Post Api - Post Usuario',
        usuarioGuardadoDB
    });

}


const putUsuario = async (req = request, res = response) => {

    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;
    const { _id, img, google, ...resto } = req.body;
    //Los parametros img, rol, estado y google no se modifican, el resto de valores si (nombre, correo y password)

    //Si la password existe o viene en el req.body, la encripta
    if ( resto.password ) {
        //Encriptar password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    
    //Editar al usuario por el id
    const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT editar user',
        usuarioEditado
    });

}

const deleteUsuario = async(req = request, res = response) => {
    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;

    //Eliminar fisicamente de la DB
    //const usuarioEliminado = await Usuario.findByIdAndDelete( id);

    //Eliminar cambiando el estado a false
     const usuarioEliminado = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE eliminar user',
        usuarioEliminado
    });
}

module.exports = {
    getUsuarios,
    postAdmin,
    postClient,
    putUsuario,
    deleteUsuario
}


// CONTROLADOR