const knex       = require('knex')
const settings   = require("./settings")
const fs         = require('fs')

const db = knex({
    client: 'pg',
    connection: settings,
    debug: false
})

const main = (first_name, last_name, birthdate) => {
    db('famous_people').insert({
        first_name,
        last_name,
        birthdate
    }, 'id')
    .then((result) => {
        console.log('Entry inserted with ID# ' + result[0])
        db.destroy()
    })
}

main(process.argv[2], process.argv[3], process.argv[4])