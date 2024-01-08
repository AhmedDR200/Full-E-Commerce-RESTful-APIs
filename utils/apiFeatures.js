

exports.filterFields = (req) => {
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(el => delete queryObj[el]);
  return queryObj;
}

exports.pagination = (req) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

exports.sorting = (req) => {
  let sortQuery;
  if(req.query.sort){
      sortQuery = req.query.sort.split(',').join(' ');
  }
  else {
      sortQuery = '-createdAt';
  }
  return sortQuery;
}

exports.fieldLimiting = (req) => {
  let fieldsQuery;
  if(req.query.fields){
      fieldsQuery = req.query.fields.split(',').join(' ');
  }
  else {
      fieldsQuery = '-__v';
  }
  return fieldsQuery;
}

exports.searching = (req) => {
  let searchQuery;
  if(req.query.keyword){
      searchQuery = {};
      searchQuery.$or = [
          {title: { $regex: req.query.keyword, $options: 'i'}},
          {description: { $regex: req.query.keyword, $options: 'i'}}
      ];
  }
  return searchQuery;
}