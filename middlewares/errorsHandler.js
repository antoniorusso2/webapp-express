function errorsHandler(err, req, res) {
  console.log(req);
  if (err)
    res.status(500).json({
      message: err.message,
    });
}

module.exports = errorsHandler;
