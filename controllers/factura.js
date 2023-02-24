//importacion de express
const {response, request} = require('express'); 
//importacion de Producto(modelo)
const Factura = require ('../models/factura.js');

const getFactura = async(req = request, res = response)=>{


    const listaFactura = await Promise.all([
        Factura.countDocuments(query),
        Factura.find(query)
    ]);

    res.json ({
            msg: 'get Api - controlador factura',
            listaFactura
        });   
    }

    const postFactura = async (req= request, res = response)=>{
        //desestructuración
        const { nombre, productos, precio, total } = req.body;

        const facturaGuardada = new Producto ({nombre, productos, precio, total});
        //guardar en la bd
        await facturaGuardada.save();

        res.json({
            msg: 'controlador factura post',
            facturaGuardada

        });
    };

    const putFactura = async (req=request, res= response)=> {
        const { id } = req.params;
        const{_id, ...resto}=req.body;

        const facturaEditada= await Factura.findByIdAndUpdate(id,resto);
        res.json ({
            msg: 'put editar factura',
            id,
            facturaEditada
        });
    }

    const deleteFactura = async (req= request, res= response) =>{
        const {id}=req.params;

        const facturaEliminada = await Factura.findByIdAndDelete(id);

        res.json({
            msg: 'Delete cambiar de estado factura',
            facturaEliminada
        });

    }

    module.exports = {
        getFactura,
        postFactura,
        putFactura,
        deleteFactura
    }
    

