// const movies = [
//   {
//     id: 1,
//     title: "Citizen Kane",
//     director: "Orson Wells",
//     year: "1941",
//     colors: false,
//     duration: 120,
//   },
//   {
//     id: 2,
//     title: "The Godfather",
//     director: "Francis Ford Coppola",
//     year: "1972",
//     colors: true,
//     duration: 180,
//   },
//   {
//     id: 3,
//     title: "Pulp Fiction",
//     director: "Quentin Tarantino",
//     year: "1994",
//     color: true,
//     duration: 180,
//   },
// ];

const database = require("./database");

const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
  .query(`select * from movies where id = ?` , [id])
  .then(([movies]) => {
    if(movies[0] != null) {
      res.json(movies[0]);
    }else{
      res.status(404).send("Page not found")
    }
  })
  .catch((err)=> {
    console.log(err);
    res.status(500).send("Error retrieving data from database")
  });


  // const movie = movies.find((movie) => movie.id === id);

  // if (movie != null) {
  //   res.json(movie);
  // } else {
  //   res.status(404).send("Not Found");
  // }
};

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
          res.status(200).send("List of Users").json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
  .query(`select * from users where id = ?` , [id])
  .then(([users]) => {
    if(users[0] != null) {
      res.status(200).json(users[0])
    }else{
      res.status(404).send("Page not found")
    }
  })
  .catch((err)=> {
    console.log(err);
    res.status(500).send("Error retrieving data from database")
  });


  // const user = users.find((user) => user.id === id);

  // if (user != null) {
  //   res.json(user);
  // } else {
  //   res.status(404).send("Not Found");
  // }
};
module.exports = {
  getMovies,
  getMovieById,
  getUsers,
  getUserById
};
