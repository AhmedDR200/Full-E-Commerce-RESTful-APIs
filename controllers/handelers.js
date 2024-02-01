const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const { filterFields, pagination, sorting, fieldLimiting, searching } = require('../utils/apiFeatures');


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


exports.updateOne = (Model) => 
    asyncHandler(
        async (req, res, next) => {
            const doc = await Model.findByIdAndUpdate(req.params.id, req.body,{ new: true});

            if(!doc){
                return next(new ApiError('Not Found', 404));
            }

            // trigger "save" event update doc
            doc.save();

            res.status(200).json({
                status: 'success',
                data: {doc}
            });
});


exports.createOne = (Model) =>
    asyncHandler(
        async (req, res) => {
            const doc = await Model.create(req.body);

            res.status(201).json({
                status: 'success',
                data: {doc}
            });
});


exports.getOne = (Model, populationOption) =>
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        // build query
        let query = Model.findById(id);
        if(populationOption){
            query = query.populate(populationOption);
        }
        // execute query
        const doc = await query;
    
        if (!doc) {
        return next(new ApiError(`No doc found with that ID: ${id}`, 404));
        }
    
        res.status(200).json({
        status: 'success',
        data: { doc },
        });
});


exports.getAll = (Model) => 
    asyncHandler(async (req, res) => {
        // Filtering
        const queryObj = filterFields(req);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        // Pagination
        const { page, limit, skip } = pagination(req);

        // Building query
        let mongooseQuery = Model.find(JSON.parse(queryStr))
            .skip(skip)
            .limit(limit);

        // Sorting
        const sortQuery = sorting(req);
        mongooseQuery = mongooseQuery.sort(sortQuery);

        // Field limiting
        const fieldsQuery = fieldLimiting(req);
        mongooseQuery = mongooseQuery.select(fieldsQuery);

        // Searching
        const searchQuery = searching(req);
        if(searchQuery){
            mongooseQuery = mongooseQuery.find(searchQuery);
        }

        // Executing query
        const docs = await mongooseQuery;

        res.json({
            status: 'success',
            results: docs.length,
            page,
            data: { docs }
        });
});