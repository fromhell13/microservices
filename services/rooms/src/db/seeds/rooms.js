
  exports.seed = async (knex) => {
      try{
        await knex('rooms').del()
        await knex('rooms').insert([
            {
                name: 'Economy Single Room',
                required_points: 260,
                available_amount:2
            },
            {
                name: 'Standard Deluxe Room',
                required_points: 320,
                available_amount:5
            }
        ])
      }catch(err){
          console.log(err)
      }
      
  }