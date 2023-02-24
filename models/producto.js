const {Schema,model}= require('mongoose');

const ProductoSchema= Schema({
    nombre:{
        type: String,
        required: [true, 'nombre Obligatorio']
    },
    descripcion:{
        type: String,
    
    },
    precio:{
        type:  String,
        required: [true, 'precio requerrido' ]
    },
    stock:{
        type: Number,
        default: 0
    },
    estado:{
        type:Boolean,
        default: true
    }
});

module.exports = model('Producto', ProductoSchema);