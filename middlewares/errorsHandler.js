function errorsHandler(err, _, res) {
  if (err)
    res.status(500).json({
      message: err.message,
    });
}

module.exports = errorsHandler;
