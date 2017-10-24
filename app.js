const { Client } = require("pg")
const settings   = require("./settings")
const fs         = require('fs')

const client = new Client(settings)

const connectDb = new Promise((resolve, reject) => {
    client.connect()
    client.query(fs.readFileSync('./dbsetup.sql', 'utf-8'))
    .then(res => {
        console.log('Initializing...')
        resolve(client)
    })
    .catch(e => {
        reject(e)
    }) 
})

const main = (name) => {
    connectDb.then(client => {
        client.query("SELECT * FROM famous_people WHERE last_name = ($1) OR first_name = ($1)", [name])
        .then(result => {
            if (result.rows.length === 0) {
                return console.log("No results found.")
            } else {
                console.log(`Found ${result.rows.length} person(s) by the name '${name}':`)
                result.rows.forEach((e, i) => {
                    console.log(`- ${i+1}: ${e.first_name} ${e.last_name}, born ${e.birthdate.toLocaleDateString()}`)
                })
            }
        })
    })
}

main(process.argv[2])