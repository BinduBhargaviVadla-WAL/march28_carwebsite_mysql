const connector = require("../connect");
exports.createTable = (req, res) => {
  console.log(connector);
  const sql =
    "CREATE TABLE users (id int AUTO_INCREMENT PRIMARY KEY,email varchar(100),password varchar(100),userInfo text,dob date)";
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
};
exports.insertUsers = (req, res) => {
  console.log(req.body);
  const { email, password, userInfo, dob } = req.body;
  const sql = `INSERT INTO users (email,password,userInfo,dob) VALUES("${email}","${password}","${userInfo}","${dob}")`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
};
exports.selectUsers = (req, res) => {
  const sql = `SELECT * FROM users`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
};
exports.viewUser = (req, res) => {
  const sql = `SELECT * FROM users WHERE id = "${parseInt(req.params.id)}"`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
};
exports.deleteUser = (req, res) => {
  console.log(req.params);
  const sql = `DELETE FROM users where id = "${parseInt(req.params.id)}"`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
};
exports.deleteAll = (req, res) => {
  const sql = `DELETE FROM users`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
};
exports.updateUser = (req, res) => {
  const { email, password, userInfo, dob } = req.body;
  const sql = `UPDATE users SET email="${email}",password="${password}",userInfo="${userInfo}",dob="${dob}" where id="${parseInt(
    req.params.id
  )}"`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
};
