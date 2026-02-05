const getById = (model) => async (id) => {
    return await model.findById(id);
}

module.exports = getById;