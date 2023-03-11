const {Schema,model}= require('mongoose');

const CarritoSchema= Schema({
    productos:[{
        type: Schema.Types.ObjectId,
        ref:'Producto'
        
    }]
});

module.exports = model('Carrito', CarritoSchema);