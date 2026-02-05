function buildQuery(model, queryParams = {}) {
  let {
    page = 1,
    limit = 10,
    sortBy = "_id",
    order = "asc",
    search,
    ...filters
  } = queryParams;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  if (page < 1) page = 1;
  if (limit < 1) limit = 10;
  if (limit > 100) limit = 100;

  const skip = (page - 1) * limit;

  const sortOptions = {};
  if (model.schema.paths[sortBy]) {
    sortOptions[sortBy] = order.toLowerCase() === "desc" ? -1 : 1;
  }

  const filterOptions = {};
  for (const [key, value] of Object.entries(filters)) {
    if (model.schema.paths[key]) {
      filterOptions[key] = value;
    }
  }

  if (search) {
    const stringFields = Object.keys(model.schema.paths).filter(
      (field) => model.schema.paths[field].instance === "String"
    );

    if (stringFields.length) {
      filterOptions.$or = stringFields.map((field) => ({
        [field]: { $regex: search, $options: "i" },
      }));
    }
  }

  return {
    skip,
    limit,
    sortOptions,
    filterOptions,
    page,
  };
}

module.exports = buildQuery;