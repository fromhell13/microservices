exports.seed = async (knex) => {
    try{
      await knex('bookings').del()
      await knex('bookings').insert([
          {
              rooms_id: 2,
              users_id: 1,
              status:'PENDING APPROVAL'
          }
      ])
    }catch(err){
        console.log(err)
    }
    
}