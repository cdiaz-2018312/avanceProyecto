//importacion de express
const {response, request} = require('express'); 
//importacion de categoria(modelo)
const Categoria = require ('../models/categoria.js');
const producto = require('../models/producto');
const Producto = require ('../models/producto');

const getCategoria = async(req = request, res = response)=>{
    //condición del get
    const query = {estado:true};

    const listaCategoria = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
    ]);

    res.json ({
            msg: 'get Api - controlador categoria',
            listaCategoria
        });   
    }

    const postCategoria = async (req= request, res = response)=>{
        //desestructuración
        const { nombre, descripcion } = req.body;

        const categoriaGuardada = new Categoria ({nombre, descripcion});
        //guardar en la bd
        await categoriaGuardada.save();

        res.json({
            msg: 'controlador categoria post',
            categoriaGuardada

        });
    };

    const putCategoria = async (req=request, res= response)=> {
        const { id } = req.params;
        const{_id, ...resto}=req.body;

        const categoriaEditada = await Categoria.findByIdAndUpdate(id,resto);
        res.json ({
            msg: 'put editar categoria',
            id,
            categoriaEditada
        });
    }

    const deleteCategoria = async (req= request, res= response) =>{
        const {id}=req.params;


        const productosPordefecto = await Producto.find ({Producto: Producto.categoria})
        
        const categoriaDefecto = '640a68cc4faf65a0a9725eb9';
        for (let producto of productosPordefecto){
            producto.categoria = categoriaDefecto;
            await producto.save();
        }

        const categoriaEliminada = await Categoria.findByIdAndDelete(id)

        res.json({
            msg: 'Delete cambiar de estado categoria (false)',
            categoriaEliminada,
            producto
        });

    }

    module.exports = {
        getCategoria,
        postCategoria,
        putCategoria,
        deleteCategoria
    }
    

