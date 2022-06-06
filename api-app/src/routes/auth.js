const {Router} = require('express');
const router = Router();
const { authUser } = require('../controllers/controllerUser.js')


router.post('/', authUser)


module.exports = router;
