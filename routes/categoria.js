// importaciones 
const { Router }= require('express');
const { check } = require('express-validator/src');
const { getCategoria, postCategoria, putCategoria, deleteCategoria } = require ('../controllers/categoria');
const { existeCategoriaId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', getCategoria);

router.post('/agregar',[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    validarCampos
], postCategoria);

router.put('/editar/:id',[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(existeCategoriaId),
    tieneRole('ADMIN_ROLE'),
    validarCampos,
], putCategoria);

router.delete('/eliminar/:id',[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(existeCategoriaId),
    tieneRole('ADMIN_ROLE'),
    validarCampos
], deleteCategoria);

module.exports = router;

//rutas