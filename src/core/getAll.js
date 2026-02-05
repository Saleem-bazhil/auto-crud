async function getAll(model,filter = {}) {
    return await model.find(filter);
}

exports = getAll;