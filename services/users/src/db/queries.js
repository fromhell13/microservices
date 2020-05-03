const knex = require('./connection')

async function getUsers() {
    return await knex('users').select()
}

async function getUsersById(users_id){
    return await knex('users')
    .where('users_id', users_id)
}

async function decrement(users_id) {
    try{
        return await knex('users')
        .where('users_id', users_id)
        .decrement('bonus_points', 1)
    }catch(err){
        console.log(err)
    }
}

async function increment(users_id) {
    try{
        return await knex('users')
        .where('users_id', users_id)
        .increment('bonus_points', 1)
    }catch(err){
        console.log(err)
    }
}

async function getBonusPoints(users_id){
    try{
        return await knex.column('bonus_points')
        .select()
        .from('users')
        .where('users_id', users_id)
    }catch(err){
        console.log(err)
    }
}

async function deduct(users_id,new_point){
    try{
        console.log('new_point', new_point)
        return await knex('users')
        .where('users_id', users_id)
        .update('bonus_points', new_point)
    }catch(err){
        console.log(err)
    }
}


module.exports = {
    getUsers,
    decrement,
    increment,
    getUsersById,
    getBonusPoints,
    deduct
}