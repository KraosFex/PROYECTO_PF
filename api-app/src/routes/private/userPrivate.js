const { Router } = require('express')

const { getUsers, getUsersByName, overallPosition } = require('../../controllers/controllerUser')
const { protect } = require('../../middleware/protect')

const router = Router()

router.get('/',
protect,
getUsers)
router.get('/username',
protect,
getUsersByName)

router.get('/position/:id',
protect,
overallPosition,
)

module.exports = router
