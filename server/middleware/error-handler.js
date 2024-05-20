const errorHandler = (error, req, res, next) => {
    const status = error.status || 422;
    res.status(status).send(error.message);
  };
  
  module.exports = errorHandler;
  