const deleteById = (model) => async (id) => {
    return await model.findByIdAndDelete(id);
}
module.exports = deleteById;    