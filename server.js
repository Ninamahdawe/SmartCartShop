const express = require('express');
const routes = require('./routes');
// import sequelize connection
const Sequelize = require('./config/connection');

// Create an instance of the Express application
const app = express();
const PORT = process.env.PORT || 3001;


// Enable parsing of JSON data in incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
Sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
