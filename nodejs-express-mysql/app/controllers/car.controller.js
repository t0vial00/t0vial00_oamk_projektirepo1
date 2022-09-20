    const Car = require("../models/car.model.js");
    
    // Create and Save a new car
    exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
 // Create a car
  const car = new Car({
    branch: req.body.branch,
    //console.log("branch");
    model: req.body.model
    //console.log("model");
  });
  
  //Save car in the database
  Car.create(car, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "An error has occurred while creating the car."
      });
    else res.send(data);
  });
};
// Retrieve all cars from the database.
exports.findAll = (req, res) => {
  const branch = req.query.branch;
  Car.getAll(branch, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "An error has occurred while retrieving cars."
      });
    else res.send(data);
  });
};
exports.findOne = (req, res) => {
  Car.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Car not found with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving car with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};
// Update a car identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  Car.updateById(
    req.params.id,
    new Car(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Car not found with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating car with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};
// Delete a car with the specified id in the request
exports.delete = (req, res) => {
  Car.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Car not found with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete car with id " + req.params.id
        });
      }
    } else res.send({ message: `car was deleted successfully!` });
  });
};
// Delete all cars from the database.
exports.deleteAll = (req, res) => {
  Car.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "An error has occurred while removing all cars."
      });
    else res.send({ message: `All cars were deleted successfully!` });
  });
};