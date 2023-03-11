// importaciones 
const { Router }= require('express');
const { getFactura,postFactura,putFactura,deleteFactura } = require ('../controllers/factura');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/mostrar',[
    validarJWT
], getFactura);
router.post('/agregar',[ 
    validarJWT,
    validarCampos], postFactura);


module.exports = router;