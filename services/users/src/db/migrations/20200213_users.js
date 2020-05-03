exports.up = async (knex) => {
    await knex.schema.createTable('users', (table) => {
        table.increments('users_id');
        table.string('name').notNullable();
        table.string('role').notNullable();
        table.integer('bonus_points').notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    })
  };
  
  exports.down = async (knex) => {
    await knex.schema.dropTable('users')
    
  };