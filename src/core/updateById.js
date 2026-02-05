const updateById = (model) => async (id, data) => {
    return await model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

module.exports = updateById;