const { Client } = require("pg")
const settings = require("./settings")

const client = new Client(settings)

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err)
  }
  client.query("SELECT $1::int AS number", ["1"], (err, result) => {
    if (err) {
      return console.error("error running query", err)
    }
    console.log(result.rows[0].number); //output: 1
    client.end()
  })
})