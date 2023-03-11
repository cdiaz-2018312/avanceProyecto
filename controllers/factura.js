//importacion de express
const {response, request} = require('express'); 
//importacion de Producto(modelo)
const Factura = require ('../models/factura.js');
const Carrito = require('../models/carrito');
const getFactura = async(req = request, res = response)=>{


    const listaFactura = await Promise.all([
        Factura.countDocuments(),
        Factura.find()
    ]);

    res.json ({
            msg: 'get Api - controlador factura',
            listaFactura
        });   
    }

    const postFactura = async (req= request, res = response)=>{
        //desestructuración
        const {idCarrito} = req.body;

        const facturaGuardada = new Factura({idCarrito});
        //guardar en la bd
        await facturaGuardada.save();

        res.json({
            msg: 'controlador factura post',
            facturaGuardada

        });
    };


    module.exports = {
        getFactura,
        postFactura
    }
    

