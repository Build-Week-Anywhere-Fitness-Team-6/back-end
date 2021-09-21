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
    table.string('name').notNullable()
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
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('classes')
}
