const errorHandler = async (err, req, res, next) => {
  const errorToSend = {
    success: false,
    error: { name: err.name, message: err.message, status: err.status },
  };
  if (err.name === "NoAccountError") {
    res.status(err.status).json(errorToSend);
  } else if (err.name === "NotGrantedAccessError") {
    res.status(err.status).json(errorToSend);
  }
  next(err);
};

module.exports = errorHandler;
