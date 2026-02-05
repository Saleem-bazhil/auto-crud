async function deleteById(model,data) {
    return await model.findByIdAndDelete(data);
}
exports = deleteById;