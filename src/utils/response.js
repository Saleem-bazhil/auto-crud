function successResponse(data, message = "success") {
    return {
        success: true,
        message,
        data
    };
}

module.exports = { successResponse };