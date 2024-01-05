// pagination.js
const getPagination = (req) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};


// search.js
const getSearch = (query, keyword) => {
  if (keyword) {
      const searchQuery = {};
      searchQuery.$or = [
          { title: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } }
      ];
      query = query.find(searchQuery);
  }
  return query;
};


// sort.js
const getSort = (query, sortBy) => {
  if (sortBy) {
      query = query.sort(sortBy.split(',').join(' '));
  } else {
      query = query.sort('-createdAt');
  }
  return query;
};


// fields.js
const getFields = (query, fields) => {
  if (fields) {
      query = query.select(fields.split(',').join(' '));
  } else {
      query = query.select('-__v');
  }
  return query;
};


// filtering.js
const getFiltering = (query, queryObj) => {
  if (queryObj && typeof queryObj === 'object') {
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach(el => delete queryObj[el]);

      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

      return query.find(JSON.parse(queryStr));
  } else {
      return query; // Return the original query if queryObj is undefined, null, or not an object
  }
};


module.exports ={
  getPagination,
  getSearch,
  getSort,
  getFields,
  getFiltering
}