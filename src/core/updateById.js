async function updateById(model, id, data) {
    return await model.findByIdAndUpdate(id, data, { new: true ,runValidators: true});
}

exports = updateById;