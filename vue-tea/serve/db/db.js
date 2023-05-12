const mysql = require('mysql')
let db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'h4451223739',
  database: 'vue_store'
})
module.exports = db
