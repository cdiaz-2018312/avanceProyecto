const {Schema,model}= require('mongoose');

const FacturaSchema= Schema({
    idUsuario:{
        type: String,
        required: [true, 'id obligatorio']
    },
    productos:{
        type: String,
    
    },
    precioProducto:{
        type:  String,
        required: [true, 'precios requeridos' ]
    },
    total:{
        type: Number,
        default: 0
    }
    
});

module.exports = model('Factura', FacturaSchema);