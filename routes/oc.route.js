const {Router} = require('express');

const {exportOsRegular} = require('../controllers/oc.controller')

const router= Router();
//Aqui puedes instanciar un middleware const {validarJwt} = require('../middleware/jwt.middleware')
// y ponerlo asi: router.post('/oc_regular', validarJwt, exportOsRegular)

router.post('/oc_regular',exportOsRegular)



module.exports=router;