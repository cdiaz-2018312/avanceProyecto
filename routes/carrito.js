// importaciones 
const { Router, request }= require('express');
const { check } = require('express-validator/src');
const { getCarrito, postCarrito, putCarrito  } = require ('../controllers/carrito');
const {  existeCarritoId,existeProductoId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();

router.get('/mostrar', getCarrito);

router.post('/agregar',[
    validarCampos
], postCarrito);

router.put('/editar/:id',[
    check('id').isMongoId(),
    check('id').custom(existeCarritoId),
    validarCampos,
], putCarrito);



module.exports = router;

//rutas