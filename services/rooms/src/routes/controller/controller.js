const fetch = require('node-fetch')
const pub = require('../../workers/publisher')

async function sanitizeJSON(obj){
    let data = JSON.stringify(obj)
    data = data.replace(/(^\[)/, '')
    data = data.replace(/(\]$)/, '')
    data = JSON.parse(data)
    return data
}

async function getBookingStatus(userPoint, roomPoint){
    let status = (parseInt(userPoint) >= parseInt(roomPoint))? 'RESERVED':'PENDING_APPROVAL'
    return status
    
}

async function fetchBonusPoint(users_id){
    let fetchData = await fetch(`http://users-service:3000/api/users/bonus_point/${users_id}`)
    let json = await fetchData.json()
    return json
}

async function fetchRoomPoint(rooms_id){
    let fetchData = await fetch(`http://rooms-service:3000/api/rooms/id/${rooms_id}`)
    let json = await fetchData.json()
    return json.data
}

async function deductBonusPoint(status, roomPoint, bonusPoint, userId){
    if(status == 'RESERVED'){
        let newPoint = parseInt(bonusPoint) - parseInt(roomPoint)
        let data = {new_point: newPoint, users_id: userId}
        const config = {
            method:'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        let response = await fetch(`http://users-service:3000/api/users/deduct`, config)
        response = await response.json()
        return response
    }
}

async function saveBooking(rooms_id, users_id, status){
    let data = {rooms_id: rooms_id, users_id:users_id, status:status}
    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    let response = await fetch(`http://bookings-service:3000/api/bookings/add`, config)
    return response
}

async function sendEmail(){
    try{
        await pub.publishToQueue('new-reservation-email', 'admin@trivago.com')
        return "Mock: Email sent!"
    }catch(err){
        console.log(err)
    }
}

module.exports={
    sanitizeJSON,
    getBookingStatus,
    deductBonusPoint,
    saveBooking,
    sendEmail,
    fetchBonusPoint,
    fetchRoomPoint
}