function errorResponse(error) {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";

  return {
    status,
    body: {
      success: false,
      message,
    },
  };
}

module.exports = errorResponse;