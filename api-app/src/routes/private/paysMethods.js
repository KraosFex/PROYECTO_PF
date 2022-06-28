const { Router } = require('express')
const router = Router()

const { protect } = require('../../middleware/protect.js')
const { payStripe } = require('../../controllers/controllerPaysMethods.js')

router.post('/', protect, payStripe)

module.exports = router
