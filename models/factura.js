const {Schema,model}= require('mongoose');

const FacturaSchema= Schema({
    idCarrito:{
        type: Schema.Types.ObjectId,
        ref: 'Carrito'
   
    }
});

module.exports = model('Factura', FacturaSchema);