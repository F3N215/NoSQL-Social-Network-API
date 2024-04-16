const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// server setup: express and environment variables
const PORT = process.env.PORT || 3001;
const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes); // using routes from routes.js
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server now running on port ${PORT}!`);
  });
});
