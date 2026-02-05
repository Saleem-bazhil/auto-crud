async function getById(model,id) {
    return await model.findById(id);
}

model.exports = getById;