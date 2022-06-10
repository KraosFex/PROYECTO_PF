const {Router} = require('express');
const router = Router();
const { authUser } = require('../controllers/controlllerAuth')


router.get('/', authUser)


module.exports = router;
