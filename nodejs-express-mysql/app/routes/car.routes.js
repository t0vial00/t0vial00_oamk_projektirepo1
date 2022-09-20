    module.exports = app => {
        
        const car = require("../controllers/car.controller.js");
            var router = require("express").Router();
            
        // Create a new car
        router.post("/", car.create);
        
    // Get latest list of all cars
    router.get("/", car.findAll);
    
        // Retrieve a single car with id
        router.get("/:id", car.findOne);
        
    // Update a car with id
    router.put("/:id", car.update);
    
        // Delete a car with id
        router.delete("/:id", car.delete);
        
    // Delete all cars
    router.delete("/", car.deleteAll);
  
  app.use('/api/car', router);
};