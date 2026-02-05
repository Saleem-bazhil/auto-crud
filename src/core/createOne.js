const createOne = (model) => async (data) => {
    try {
        return await model.create(data);
    } catch (error) {
        if (error.name === 'ValidationError') {
            error.status = 400;
        }
        throw error;
    }
}

module.exports = createOne;