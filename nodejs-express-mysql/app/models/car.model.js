const sql = require("./db.js");
// constructor
const car = function(car) {
  this.branch = car.branch;
  this.model = car.model;
  
};
car.create = (newcar, result) => {
  sql.query("INSERT INTO car SET ?", newcar, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created car: ", { id: res.insertId, ...newcar });
    result(null, { id: res.insertId, ...newcar });
  });
};
car.findById = (id, result) => {
  sql.query(`SELECT * FROM car WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    
    if (res.length) {
      console.log("found car: ", res[0]);
      result(null, res[0]);
      return;
    }
    
    
    // no car found with the id
    result({ kind: "not_found" }, null);
  });
};

        car.getAll = (title, result) => {
          let query = "SELECT * FROM car";
          if (title) {
            query += ` WHERE title LIKE '%${title}%'`;
          }
          sql.query(query, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
            console.log("car: ", res);
            result(null, res);
          });
        };
            car.getAllPublished = result => {
              sql.query("SELECT * FROM car WHERE published=true", (err, res) => {
                if (err) {
                  console.log("error: ", err);
                  result(null, err);
                  return;
                }
                console.log("car: ", res);
                result(null, res);
              });
            };
    car.updateById = (id, car, result) => {
    sql.query(
    "UPDATE car SET title = ?, description = ?, published = ? WHERE id = ?",
    [car.title, car.description, car.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found car with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated car: ", { id: id, ...car });
      result(null, { id: id, ...car });
    }
        );
    };
    
        car.remove = (id, result) => {
          sql.query("DELETE FROM car WHERE id = ?", id, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
            if (res.affectedRows == 0) {
              // not found car with the id
              result({ kind: "not_found" }, null);
              return;
            }
            console.log("deleted car with id: ", id);
            result(null, res);
          });
        };
        
            car.removeAll = result => {
              sql.query("DELETE FROM car", (err, res) => {
                if (err) {
                  console.log("error: ", err);
                  result(null, err);
                  return;
                }
                console.log(`deleted ${res.affectedRows} car`);
                result(null, res);
              });
            };
                module.exports = car;