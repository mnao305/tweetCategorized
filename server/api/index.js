const express = require('express')
const router = express.Router()

router.use('/twitter', require('./twitter'))
router.use('/category', require('./category'))

module.exports = router
