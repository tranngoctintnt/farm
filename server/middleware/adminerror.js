function errorHandler(err, req, res, next) {
    console.error('Error:', err.stack);
    const status = err.status || 500;
    const message = err.message || 'Something went wrong on the server';
    res.status(status).json({ success: false, message });
  }
  
  module.exports = errorHandler;