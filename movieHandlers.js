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
    .query(`select * from movies where id = ?`, [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.status(404).send("Page not found");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving data from database");
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
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query(`select * from users where id = ?`, [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.status(200).json(users[0]);
      } else {
        res.status(404).send("Page not found");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving data from database");
    });

  // const user = users.find((user) => user.id === id);

  // if (user != null) {
  //   res.json(user);
  // } else {
  //   res.status(404).send("Not Found");
  // }
};

const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  // console.log(req.body);
  // res.send("Post route is working 🎉");

  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
      // wait for it
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });

};
const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  // console.log(req.body);
  // res.send("Post route is working 🎉");

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
      // wait for it
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });

};

const putMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;
  
  database
  .query(
    "update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",
    [title, director, year, color, duration, id]
  )
    .then(([result]) => {
      console.log(result, "zzzzzzz");
      if (result.affectedRows = 0) {
        res.status(404).send("Not Found");
      } else {
        res.status(204).json({data:"Not Content"});
      }
      // result.affectedRows ? res.status(204).send("Not Content") : res.status(404).send("Not Found");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    })
  };

  const putUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, email, city, language } = req.body;
    
    database
    .query(
      "update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
      [firstname, lastname, email, city, language, id]
    )
      .then(([result]) => {
        // if (result.affectedRows = 0) {
        //   res.status(404).send("Not Found");
        // } else {
        //   res.status(204).send ("Not Content");
        // }
        result.affectedRows ? res.status(204).send("Not Content") : res.status(404).send("Not Found");
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      })
    };
module.exports = {
  getMovies,
  getMovieById,
  postMovie, // don't forget to export your function ;)
  getUsers,
  getUserById,
  postUser,
  putMovie,
  putUser
 };
