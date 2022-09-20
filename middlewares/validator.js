/*Validateur pour "movies" afin de vérifier s'il y les champs (not null dans SQL) remplient, par étape afin de spécifier le champ en question*/
// const validateMovie = (req, res, next) => {
//   const { title, director, year, color, duration } = req.body;
//   const errors = [];

//   //switch(test)** mieux qu'une succesion de 'if' 'else'//
//   switch (title) {
//     case "":
//       errors.push({ field: "title", message: "is required" });
//       break;
//     case null:
//       errors.push({
//         field: "title",
//         message: "cannot be  NULL please enter value inside",
//       });
//       break;
//       case title.length >= 255:
//       errors.push({
//         field: "title",
//         message: "Should contain less than 255 characters",
//       });
//   }
//   switch (director) {
//     case "":
//       errors.push({ field: "director", message: "is required" });
//       break;
//     case null:
//       errors.push({
//         field: "director",
//         message: "cannot be  NULL, please enter value inside.",
//       });
//       break;
//       case director.length >= 255:
//       errors.push({
//         field: "director",
//         message: "Should contain less than 255 characters",
//       });
//   }
//   switch (year) {
//     case "":
//       errors.push({ field: "year", message: "is required" });
//       break;
//     case null:
//       errors.push({
//         field: "year",
//         message: "cannot be  NULL, please enter value inside.",
//       });
//       break;
//       case year.length >= 255:
//       errors.push({
//         field: "year",
//         message: "Should contain less than 255 characters",
//       });
//   }
//   switch (color) {
//     case "":
//       errors.push({ field: "color", message: "is required" });
//       break;
//     case null:
//       errors.push({
//         field: "color",
//         message: "cannot be  NULL, please enter value inside.",
//       });
//       break;
//       case color.length >= 255:
//       errors.push({
//         field: "color",
//         message: "Should contain less than 255 characters",
//       });
//   }
//   switch (duration) {
//     case "":
//       errors.push({ field: "duration", message: "is required" });
//       break;
//     case null:
//       errors.push({
//         field: "duration",
//         message: "cannot be  NULL, please enter value inside.",
//       });
//       break;
//       case duration.Int():
//       errors.push({
//         field: "duration",
//         message: "Should contain only number",
//       });
//   }
//   /*Si une erreur est présente l'afficher, sinon rien */
//   errors.length 
//   ? res.status(422).json({ validationErrors: errors }) 
//   : next();
//   console.log("ZZZZZZZZZZZ", errors);
// };

const { body, validationResult } = require('express-validator');

const validateMovie = [
  
  body("title").isLength({ max: 255}).exists(), 
  body("director").isLength({ max: 255}).exists(),
  body("year").isInt().isLength({max: 4}).exists(),
  body("color").isInt().isLength({max: 1}).exists(),
  body("duration").isInt().exists(),

(req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    res.status(422).json({ validationErrors: errors.array()});
  }else{
    next();
  }
 },
];

const validateUser = [
  body("email").isEmail().exists(), 
  body("firstname").isLength({ max: 255}).exists(),
  body("lastname").isLength({ max: 255}).exists(),
(req, res, next) => {
  const errors = validationResult(req);
  //   User.create({
  //   username: req.body.username,
  //   password: req.body.password,
  // }).then(user => res.json(user));

  if(!errors.isEmpty()){
    res.status(422).json({ validationErrors: errors.array()});
  }else{
    next();
  }
 },
];
  
  // switch (email) {
  //   case !emailRegex.test(email):
  //     errors.push({ field: "email", message: "Invalid email" });
  // }
  // errors.length ? res.status(422).json({ validationErrors: errors }) : next();
// };

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
