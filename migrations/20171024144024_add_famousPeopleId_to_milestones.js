
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('milestones', (t) => {
        t.integer('famous_person_id').references('id').inTable('famous_people')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('milestones', (t) => {
        t.dropColumn('famous_person_id')
    })
};
