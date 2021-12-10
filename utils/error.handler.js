module.exports = (err, req, res, next) => {
  res.status(err.statusCode).json({ message: err.message });
};
