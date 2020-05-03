exports.up = async (knex) => {
    await knex.schema.createTable('rooms', (table) => {
        table.increments('rooms_id');
        table.string('name').notNullable();
        table.integer('required_points').notNullable();
        table.integer('available_amount').notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    })
  };
  
  exports.down = async (knex) => {
    await knex.schema.dropTable('rooms')
    
  };