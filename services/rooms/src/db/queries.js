const knex = require('./connection')

async function getRooms() {
    return await knex('rooms').select()
}

async function getRoomById(rooms_id){
    try{
        return await knex('rooms')
        .where('rooms_id', rooms_id)
    }catch(err){
        console.log(err)
    }
}

async function getRoomBonusPoint(rooms_id){
    try{
        return await knex.column('required_points')
        .select()
        .from('rooms')
        .where('rooms_id', rooms_id)
    }catch(err){
        console.log(err)
    }
}



module.exports = {
    getRooms,
    getRoomById,
    getRoomBonusPoint
}

