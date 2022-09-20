require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json()); // add this line

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const middlewares = require("./middlewares/validator");
const { hashPassword } = require("./auth");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users",movieHandlers.getUsers);
app.get("/api/users/:id", movieHandlers.getUserById);
app.post("/api/movies", middlewares.validateMovie, movieHandlers.postMovie);
app.post("/api/users", middlewares.validateUser, hashPassword, movieHandlers.postUser);
app.put("/api/movies/:id", middlewares.validateMovie, movieHandlers.putMovie);
app.put("/api/users/:id", middlewares.validateUser, movieHandlers.putUser);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", movieHandlers.deleteUser);



app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
