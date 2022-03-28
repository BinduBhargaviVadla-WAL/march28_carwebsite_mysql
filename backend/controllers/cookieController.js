exports.setCity = (req, res) => {
  res.cookie(req.params.city, req.params.value);
  res.send(`cookie with city name ${req.params.value} set`);
};
exports.setNameValueTime = (req, res) => {
  res.cookie(req.params.name, req.params.value, {
    maxAge: req.params.time * 60 * 1000,
  });
  res.send(
    `cookie with name ${req.params.name} and value ${req.params.value} and will expire in ${req.params.time} minutes`
  );
};
exports.viewCookies = (req, res) => {
  res.send(req.cookies);
};
exports.deleteCookie = (req, res) => {
  res.clearCookie(req.params.name);
  res.send(`cookie with name ${req.params.name} is defined`);
};
