const express = require('express')
const queries = require('../db/queries')
const controller = require('./controller/controller')
const publisher = require('../workers/publisher')
const fetch = require('node-fetch')
const router = express.Router()

router.get('/ping', async (req, res) => {
    res.send('pong')
})

/*
    get list of rooms
*/ 
router.get('/', async (req, res, next) => {
    try{
        const rooms = await queries.getRooms()
        res.status(200).json({
            data: rooms
        })
    }catch(err){
        console.log(err)
    }
})

/**
 *  Get room by id
 */
router.get('/id/:rooms_id', async (req,res,next) => {
    try{
        const room = await queries.getRoomById(req.params.rooms_id)
        res.status(200).json({
            data: room
        })
    }catch(err){
        console.log(err)
    }
})

router.post('/book/:rooms_id', async(req,res,next) => {
    // get user bonus point
    let fetchBonusPoint = await controller.fetchBonusPoint(req.body.users_id)
    let bonusPoint = await controller.sanitizeJSON(fetchBonusPoint)
    bonusPoint = bonusPoint['bonus_points']
    
    // get room required point
    let fetchRoomPoint = await controller.fetchRoomPoint(req.params.rooms_id)
    let roomPoint = await controller.sanitizeJSON(fetchRoomPoint)
    roomPoint = roomPoint['required_points']
    
    // get booking status
    let bookingStatus = await controller.getBookingStatus(bonusPoint, roomPoint)
   
    // deduct user's bonus points
    await controller.deductBonusPoint(bookingStatus, roomPoint, bonusPoint, req.body.users_id)
    
    // insert reservation data via booking service
    let response = await controller.saveBooking(req.params.rooms_id, req.body.users_id, bookingStatus)

    // send email notification
    if(response.status == 200){
        await controller.sendEmail() 
    }


    res.status(200).json({
        data: 'Reservation completed'
    })
})





module.exports = router