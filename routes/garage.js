const express = require('express')
const router = express.Router()
const {
    addGarage,
    updateGarage,
    getGarage
} = require('../controller/garage')
router.post('/updateGarage', updateGarage)
router.post('/addGarage', addGarage)
router.get('/getGarage', getGarage)
module.exports = router
