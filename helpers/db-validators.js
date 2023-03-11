const producto = require('../models/producto');
const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria= require('../models/categoria');
const Carrito = require('../models/carrito');

//Este archivo maneja validaciones personalizadas

const esRoleValido = async( rol = '' ) => {

    const existeRol = await Role.findOne( { rol } );

    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la DB`);
    }

}

const existeProductoId= async(id="")=>{
    const existeProducto= await producto.findById(id)
    if (!existeProducto) {
        throw new Error(`El producto con id: ${id} no existe en la BD`);
    }

}

const existeCategoriaId= async(id="")=>{
    const existeCategoriaId= await Categoria.findById(id)
    if (!existeCategoriaId) {
        throw new Error(`la categoria con id: ${id} no existe en la BD`);
    }

}
const existeCarritoId= async(id="")=>{
    const existeCarroId= await Carrito.findById(id)
    if (!existeCarroId) {
        throw new Error(`No existe el carrito con id: ${id}`);
    }

}


const emailExiste = async( correo = '' ) => {

    //Verificamos si el correo ya existe en la DB
    const existeEmail = await Usuario.findOne( { correo } );

    //Si existe (es true) lanzamos excepción
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo } ya existe y esta registrado en la DB`);
    }

}

const esRoleAdmin = async(id="") =>{
    const roleAdmin= await Usuario.findById(id);
    if (roleAdmin.rol == 'ADMIN_ROLE') {
        throw new Error (`el usuario con el id ${id} es rol admin, no se puede eliminar`);
    }
}

const existeUsuarioPorId = async(id="") => {

    //Verificar si el ID existe
    const existeUser = await Usuario.findById(id);

    if ( !existeUser ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }

}



module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeProductoId,
    esRoleAdmin,
    existeCategoriaId,
    existeCarritoId
}