
exports.up = function(knex, Promise) {
    return knex.schema.createTable('milestones', (t) => {
        t.increments()
        t.string('description')
        t.date('date_achieved')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('milestones')
};
