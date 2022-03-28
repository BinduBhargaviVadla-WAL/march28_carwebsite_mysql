var connector = require("../poolconnect");
exports.createtable = (req, res) => {
  console.log(connector);
  const sql =
    "CREATE TABLE car (CarId int AUTO_INCREMENT PRIMARY KEY,CarName varchar(200),Price int,Color ENUM('black','blue','gray'),inStock BOOLEAN)";
  connector.query(sql, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      res.json(results);
    }
  });
};
exports.insertCar = (req, res) => {
  const { CarName, Price, Color, inStock } = req.body;
  console.log(req.body);
  const sql = `INSERT INTO car (CarName,Price,Color,inStock) VALUES(?,?,?,?)`;
  connector.query(
    sql,
    [CarName, Price, Color, inStock],
    function (err, results, fields) {
      if (err) {
        res.json(err);
      } else {
        res.json(results);
      }
    }
  );
};
exports.selectAll = (req, res) => {
  const sql = `SELECT * FROM car`;
  connector.query(sql, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      res.json(results);
    }
  });
};
exports.viewCar = (req, res) => {
  const sql = `SELECT * FROM car WHERE CarId = "${parseInt(req.params.id)}"`;
  connector.query(sql, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      res.json(results);
    }
  });
};
exports.deleteCar = (req, res) => {
  console.log(req.params);
  const sql = `DELETE FROM car where CarId = "${parseInt(req.params.id)}"`;
  connector.query(sql, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      res.json(results);
    }
  });
};
exports.deleteAll = (req, res) => {
  const sql = `DELETE FROM car`;
  connector.query(sql, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      res.json(results);
    }
  });
};
exports.updateCar = (req, res) => {
  const { CarName, Price, Color, inStock } = req.body;
  const sql = `UPDATE car SET CarName=?,Price=?,Color=?,inStock=? where CarId="${parseInt(
    req.params.id
  )}"`;
  connector.query(
    sql,
    [CarName, Price, Color, inStock],
    function (err, results, fields) {
      if (err) {
        res.json(err);
      } else {
        res.json(results);
      }
    }
  );
};
