const createOne = require("../core/createOne");
const getAll = require("../core/getAll");
const getById = require("../core/getById");
const updateById = require("../core/updateById");
const deleteById = require("../core/deleteById");

const { successResponse } = require("../utils/response");

function autoCrud(app, model, options = {}) {
  if (!app || !model) {
    throw new Error("autoCrud requires an Express app and a Model");
  }

  const basePath = options.path || `/${model.modelName.toLowerCase()}s`;

  app.post(basePath, async (req, res, next) => {
    try {
      const result = await createOne(model)(req.body);
      res
        .status(201)
        .json(successResponse(result, "Resource created successfully"));
    } catch (error) {
      next(error);
    }
  });

  app.get(basePath, async (req, res, next) => {
    try {
      const results = await getAll(model)( req.query);
      res.json(successResponse(results));
    } catch (error) {
      next(error);
    }
  });

  app.get(`${basePath}/:id`, async (req, res, next) => {
    try {
      const result = await getById(model)(req.params.id);
      res.status(200).json(successResponse(result));
    } catch (error) {
      next(error);
    }
  });

  app.put(`${basePath}/:id`, async (req, res, next) => {
    try {
      const result = await updateById(model)(req.params.id, req.body);
      res
        .status(200)
        .json(successResponse(result, "Resource updated successfully"));
    } catch (error) {
      next(error);
    }
  });

  app.delete(`${basePath}/:id`, async (req, res, next) => {
    try {
      const result = await deleteById(model)(req.params.id);
      res
        .status(200)
        .json(successResponse(result, "Resource deleted successfully"));
    } catch (error) {
      next(error);
    }
  });
}

module.exports = autoCrud;
