exports.seed = async (knex) => {
    try{
      await knex('users').del()
      await knex('users').insert([
          {
              name: 'David',
              role: 'user',
              bonus_points:200
          },
          {
              name: 'Sara',
              role: 'user',
              bonus_points:400
          }
      ])
    }catch(err){
        console.log(err)
    }
    
}