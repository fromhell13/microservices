exports.up = async (knex) => {
    await knex.schema.createTable('bookings', (table) => {
        table.increments('bookings_id');
        table.integer('rooms_id').notNullable();
        table.integer('users_id').notNullable();
        table.string('status').notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    })
  };
  
  exports.down = async (knex) => {
    await knex.schema.dropTable('bookings')
    
  };