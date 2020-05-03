const knex = require('./connection')

async function getBookings() {
    return await knex('bookings').select()
}

async function add(obj) {
    return await knex('bookings').insert(obj)
}


module.exports = {
    getBookings,
    add
}