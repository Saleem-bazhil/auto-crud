const buildQuery = require("../utils/buildQuery");

function getAll(model) {
  return async function (queryParams = {}) {
    const {
      skip,
      limit,
      sortOptions,
      filterOptions,
      page,
    } = buildQuery(model, queryParams);

    const data = await model
      .find(filterOptions)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await model.countDocuments(filterOptions);

    return {
      total,
      page,
      limit,
      data,
    };
  };
}

module.exports = getAll;