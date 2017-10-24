const knex       = require('knex')
const settings   = require("./settings")
const fs         = require('fs')

const db = knex({
    client: 'pg',
    connection: settings,
    debug: false
})

const setupDb = (cb) => {
    return db.schema.dropTableIfExists('famous_people')
    .then(() => {
        return db.schema.createTable('famous_people', (t) => {
            t.increments()
            t.string('first_name')
            t.string('last_name')
            t.date('birthdate')
        })
    }).then(() => {
        const rows = [
            {
                first_name: 'Abraham',
                last_name: 'Lincoln',
                birthdate: '1809-02-12'
            },
            {
                first_name: 'Mahatma',
                last_name: 'Ghandi',
                birthdate: '1869-10-02'
            },
            {
                first_name: 'Paul',
                last_name: 'Rudd',
                birthdate: '1969-04-06'
            }
        ]
    
        return db.batchInsert('famous_people', rows)
    })
}

const printRows = (name, result) => {
    if (!result) {
        return console.log('No results found.')
    }

    console.log(`Found ${result.length} person(s) by the name '${name}':`)
    result.forEach((e, i) => {
        console.log(`- ${i+1}: ${e.first_name} ${e.last_name}, born ${e.birthdate.toLocaleDateString()}`)
    })
}

const findRows = (name) => {
    db.select()
    .table('famous_people')
    .where('first_name', name)
    .orWhere('last_name', name)
    .then(result => {
        printRows(name, result)
        db.destroy()
    }).catch(e => console.log(e))
}

const main = (name) => {
    setupDb()
    .then(() => {
        findRows(name) 
    })
}

main(process.argv[2])