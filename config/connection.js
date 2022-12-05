// connect to mongodb
const { connect, connection } = require("mongoose");

const connectionString =
  "mongodb+srv://davidHerring:Punkypunk!98@socialnetwork.py7wman.mongodb.net/?retryWrites=true&w=majority";

connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = connection;
