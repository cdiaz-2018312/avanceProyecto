// importaciones 
const { Router }= require('express');
const { getProducto, postProducto, putProducto, deleteProducto, getProductoMasVendidosyAgotados } = require ('../controllers/producto');
const { validarJWT } = require('../middlewares/validar-jwt');
const {check} = require('express-validator');
const { existeProductoId } = require('../helpers/db-validators');
const { tieneRole } = require('../middlewares/validar-roles');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.get('/mostrar/masVendidosAgotados', getProductoMasVendidosyAgotados);
router.get('/mostrar', getProducto);
router.post('/agregar',[  
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    validarCampos
], postProducto);
router.put('/editar/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoId),
    tieneRole('ADMIN_ROLE'),
    validarCampos
], putProducto);
router.delete('/eliminar/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoId),
    tieneRole('ADMIN_ROLE'),
    validarCampos
], deleteProducto);

module.exports = router;

//rutas;