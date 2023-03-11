const {Schema,model}= require('mongoose');

const ProductoSchema= Schema({
    nombre:{
        type: String,
        required: [true, 'nombre Obligatorio']
    },
    precio:{
        type:  String,
        required: [true, 'precio requerrido' ]
    },
    stock:{
        type: Number,
        default: 0
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria'
    },
    estado:{
        type:Boolean,
        default: true
    }
});

module.exports = model('Producto', ProductoSchema);