// Update with your config settings.
const fs = require('fs')

module.exports = {
  development: {
    client: 'pg',
    connection: require('./settings')
  }
}
