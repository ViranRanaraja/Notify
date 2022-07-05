const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
     extended: false
    }));

app.use(bodyParser.json());

//when localhost:8080 is open this message can be seen
app.get('/', (req, res) => {
    res.json("Welcome to the Backend of Notify");
  });

require("./app/routes/user_routes")(app);
require("./app/routes/note_routes")(app);
 
//setting the port for the server
const server_port = process.env.PORT || 8080;

app.listen(server_port, () => {
  console.log(`Server is running on Port: ${server_port}`);
});

const db = require("./app/model");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!");
    process.exit();
  });