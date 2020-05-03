const express = require('express')
const queries = require('../db/queries')
const router = express.Router()

router.get('/ping', async (req, res) => {
    res.send('pong')
})

/*
    get list of bookings
*/
router.get('/', async (req, res, next) => {
    try{
        const bookings = await queries.getBookings()
        res.status(200).json({
            data: bookings
        })
    }catch(err){
        console.log(err)
    }
})

/**
 * Add bookings
 */
router.post('/add', async (req,res,next) => {
    try{

        await queries.add(req.body)
        res.status(200).send({
            data: 'Reservation completed'
        })
    }catch(err){
        console.log(err)
    }
})

module.exports = router