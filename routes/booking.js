const express = require('express')
const router = express.Router()
const {
    booking,
    updateBooking
} = require('../controller/booking')
router.post('/bookings', updateBooking)
router.get('/bookings', booking)
module.exports = router
