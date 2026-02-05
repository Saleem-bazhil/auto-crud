function validateBody(model,data) {
    const requiredFields =  [];

    for (const field in model.schema.paths) {
        const schemaType = model.schema.paths[field];
        if (schemaType.isRequired && (field !== "_id")) {
            requiredFields.push(field);
        }
    }

    const missingFields = requiredFields.filter(
         (field) => data[field] === undefined
);

    if (missingFields.length > 0) {
        throw {
            status: 400,
            message: `Missing required fields: ${missingFields.join(', ')}`
        };
    }
}

module.exports = validateBody;