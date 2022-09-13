/*Validateur pour "movies" afin de vérifier s'il y les champs (not null dans SQL) remplient, par étape afin de spécifier le champ en question*/
const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;
  const errors = [];

  //   if (title == null) {
  //     errors.push({ field: "title", message: "This field is required" });
  //   }
  //   if (director == null) {
  //     errors.push({ field: "director", message: "This field is required" });
  //   }
  //   if (year == null) {
  //     errors.push({ field: "year", message: "This field is required" });
  //   }
  //   if (color == null) {
  //     errors.push({ field: "color", message: "This field is required" });
  //   }
  //   if (duration == null) {
  //     errors.push({ field: "duration", message: "This field is required" });
  //   }

  //   if (errors.length) {
  //     res.status(422).json({ validationErrors: errors });
  //   } else {
  //     next();
  //   }

  //switch(test)** mieux qu'une succesion de 'if' 'else'//

  switch (title) {
    case "":
      errors.push({ field: "title", message: "is required" });
      break;
    case null:
      errors.push({
        field: "title",
        message: "cannot be  NULL please enter value inside",
      });
  }
  switch (director) {
    case "":
      errors.push({ field: "director", message: "is required" });
      break;
    case null:
      errors.push({
        field: "director",
        message: "cannot be  NULL, please enter value inside.",
      });
  }
  switch (year) {
    case "":
      errors.push({ field: "year", message: "is required" });
      break;
    case null:
      errors.push({
        field: "year",
        message: "cannot be  NULL, please enter value inside.",
      });
  }
  switch (color) {
    case "":
      errors.push({ field: "color", message: "is required" });
      break;
    case null:
      errors.push({
        field: "color",
        message: "cannot be  NULL, please enter value inside.",
      });
  }
  switch (duration) {
    case "":
      errors.push({ field: "duration", message: "is required" });
      break;
    case null:
      errors.push({
        field: "duration",
        message: "cannot be  NULL, please enter value inside.",
      });
  }
  /*Si une erreur est présente l'afficher, sinon rien */
  errors.length ? res.json({ validationErrors: errors }) : next();
  // console.log("ZZZZZZZZZZZ", errors);
};

const validateUser = (req, res, next) => {
  const { email } = req.body;
  const errors = [];
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

  switch (email) {
    case !emailRegex.test(email):
      errors.push({ field: "email", message: "Invalid email" });
  }
  errors.length ? res.status(422).json({ validationErrors: errors }) : next();
};

// const { body, validationResult } = require('express-validator');

// const validateUser = [
//   body("email").isEmail(),
//   body("firstname").isLength({ max: 255 }),
//   body("lastname").isLength({ max: 255 }),

//   (req, res, next) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       res.status(422).json({ validationErrors: errors.array() });
//     } else {
//       next();
//     }
//   },
// ]; 

module.exports = {
  validateMovie,
  validateUser,
};
