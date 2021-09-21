exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('user_name', 200).notNullable()
      users.string('password', 200).notNullable()
      users.string('role', 200).notNullable()
      users.timestamps(false, true)
    })
  .createTable('classes', table =>{
    table.increments('class_id')
    table.string('name').notNullable().unique()
    table.string('type').notNullable()
    table.string('time').notNullable()
    table.string('day').notNullable()
    table.integer('duration').notNullable()
    table.string('intensity').notNullable()
    table.string('location').notNullable()
    table.integer('current_attendees').notNullable()
    table.integer('max_capacity').notNullable()
    table.string('punch_pass').notNullable()
  })


  .createTable('users_classes', table =>{
    table.increments()
    table.integer('class_id')
    .references('class_id')
    .inTable('classes')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
    table.integer('user_id')
    .references('user_id')
    .inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users_classes')
  await knex.schema.dropTableIfExists('classes')
  await knex.schema.dropTableIfExists('users')

}
