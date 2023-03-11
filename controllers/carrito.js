//importacion de express
const {response, request} = require('express'); 
const Carrito = require('../models/carrito');
//importacion de categoria(modelo)
const Producto = require ('../models/producto');

const getCarrito = async(req = request, res = response)=>{
    //condición del get

    const listaCarrito = await Promise.all([
        Carrito.countDocuments(),
        Carrito.find()
    ]);

    res.json ({
            msg: 'get Api - controlador categoria',
            listaCarrito
        });   
    }

    const postCarrito = async (req= request, res = response)=>{
        //desestructuración
        const { idProducto } = req.body;

        const carritoGuardado = new Carrito ({idProducto});
        //guardar en la bd
        await carritoGuardado.save();

        res.json({
            msg: 'controlador categoria post',
            carritoGuardado

        });
    };

    const putCarrito = async (req = request, res = response) => {
        //Desestructuracion objeto
        const { id } = req.params;
        //Variable para buscar si el curso si ya existe
        const CarritoProducto = await Carrito.findById(id);
        
                //Generar data a ingresar en el arreglo
                const data = { _id: req.body.idProducto };
                CarritoProducto.productos.push(data);
                await CarritoProducto.save();
                res.status(201).json(CarritoProducto);
    }

    module.exports = {
        getCarrito,
        postCarrito,
        putCarrito
        
    }
    

