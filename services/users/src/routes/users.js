const express = require('express')
const queries = require('../db/queries')
const router = express.Router()

router.get('/ping', async (req, res) => {
    res.send('pong')
})

/*
    get list of users
*/
router.get('/', async (req, res, next) => {
    try{
        const users = await queries.getUsers()
        res.status(200).json({
            data: users
        })
    }catch(err){
        console.log(err)
    }
})

/**
 *  get user by id
 */
router.get('/id/:users_id', async (req,res,next) => {
    try{
        const user = await queries.getUsersById(req.params.users_id)
        res.status(200).json({
            data: user
        })
    }catch(err){
        console.log(err)
    }
})

/**
 *  decrement bonus point
 */
router.get('/decrement/:user_id', async (req,res,next) => {
    try{
        await queries.decrement(req.params.user_id);
        const user = await queries.getUsersById(req.params.user_id)
        res.status(200).json({
            data: user
        })
    }catch(err){

    }
})

/**
 *  increment bonus point
 */
router.get('/increment/:user_id', async (req,res,next) => {
    try{
        await queries.increment(req.params.user_id);
        const user = await queries.getUsersById(req.params.user_id)
        res.status(200).json({
            status: 'success',
            data: user
        })
    }catch(err){
        console.log(err)
    }
})

/**
 *  get bonus point
 */
router.get('/bonus_point/:user_id', async (req,res,next) => {
    try{
        const user = await queries.getBonusPoints(req.params.user_id)
        res.status(200).send(user)
    }catch(err){

    }
})
/**
 * deduct bonus point from reservation
 */
router.put('/deduct', async (req,res,next) => {
    try{
        await queries.deduct(req.body.users_id,req.body.new_point)
        res.status(200).send({data:'Points deducted'})
    }catch(err){
        console.log(err)
    }
})

module.exports = router