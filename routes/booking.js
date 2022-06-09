const express = require('express')
const router = express.Router()
const {
    booking,
    updateBooking
} = require('../controller/booking')
router.get('/',(req,res)=>{res.status(200).json({"message":"Welcome!"})})
router.post('/bookings', updateBooking)
router.get('/bookings', booking)
module.exports = router
