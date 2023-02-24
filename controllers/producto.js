//importacion de express
const {response, request} = require('express'); 
//importacion de Producto(modelo)
const Producto = require ('../models/producto.js');

const getProducto = async(req = request, res = response)=>{
    //condición del get
    const query = {estado:true};

    const listaProducto = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
    ]);

    res.json ({
            msg: 'get Api - controlador Producto',
            listaProducto
        });   
    }

    const postProducto = async (req= request, res = response)=>{
        //desestructuración
        const { nombre, descripcion, precio, stock } = req.body;

        const productoGuardado = new Producto ({nombre, descripcion, precio, stock});
        //guardar en la bd
        await productoGuardado.save();

        res.json({
            msg: 'controlador producto post',
            productoGuardado

        });
    };

    const putProducto = async (req=request, res= response)=> {
        const { id } = req.params;
        const{_id, ...resto}=req.body;

        const productoEditado = await Producto.findByIdAndUpdate(id,resto);
        res.json ({
            msg: 'put editar procuto',
            id,
            productoEditado
        });
    }

    const deleteProducto = async (req= request, res= response) =>{
        const {id}=req.params;

        const productoEliminado = await Producto.findByIdAndUpdate(id, {estado: false})

        res.json({
            msg: 'Delete cambiar de estado product0 (false)',
            productoEliminado
        });

    }

    module.exports = {
        getProducto,
        postProducto,
        putProducto,
        deleteProducto
    }
    

