const express = require('express')
const router = express.Router()

router.use('/twitter', require('./twitter'))
router.use('/category', require('./category'))
router.use('/user', require('./user'))

module.exports = router
