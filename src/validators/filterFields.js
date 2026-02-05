function filterFields(model, data) {
  const allowedFields = Object.keys(model.schema.paths).filter(
    (field) => !["_id", "__v"].includes(field),
  );
  const invalidFields = Object.keys(data).filter(
    (key) => !allowedFields.includes(key),
  );

  if (invalidFields.length > 0) {
    throw {
      status: 400,
      message: `Invalid fields: ${invalidFields.join(", ")}`,
    };
  }
}
