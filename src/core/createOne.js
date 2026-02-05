async function createone(model,data) {
    return await model.create(data);
}

model.exports = createone;