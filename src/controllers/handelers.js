const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

// Delete one document
exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndDelete(id);

    if (!doc) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }

    // Trigger "remove" event when update document
    // doc.remove();
    res.status(204).send();
  });

// Update one document
exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!doc) {
      return next(new ApiError("Not Found", 404));
    }

    // trigger "save" event update doc
    doc.save();

    res.status(200).json({
      status: "success",
      data: { doc },
    });
  });

// Create one document
exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: { doc },
    });
  });

// Get one document
exports.getOne = (Model, populationOption) =>
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    // build query
    let query = Model.findById(id);
    if (populationOption) {
      query = query.populate(populationOption);
    }
    // execute query
    const doc = await query;

    if (!doc) {
      return next(new ApiError(`No doc found with that ID: ${id}`, 404));
    }

    res.status(200).json({
      status: "success",
      data: { doc },
    });
  });

// Get all documents
exports.getAll = (Model, modelName = "") =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    // Build query
    const documentsCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(documentsCounts)
      .filter()
      .search(modelName)
      .limitFields()
      .sort();

    // Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;

    res.status(200).json({
      results: documents.length,
      paginationResult,
      data: documents,
    });
  });
