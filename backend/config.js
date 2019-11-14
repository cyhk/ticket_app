// enable reading for .env file
require("dotenv").config();

const PORT = +process.env.PORT || 5000;

const DB_URI = "postgres:///ticket_app"

module.exports = {
  PORT,
  DB_URI
}