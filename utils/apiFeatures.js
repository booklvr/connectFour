// complete later for field searches

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // ?title[gte]=f&target[gte]=f
  filter() {
    // 1A) Filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    queryStr = JSON.parse(queryStr);

    // queryStr = { title: { $regex: title, $options: 'i' } };

    for (const [key, val] of Object.entries(queryStr)) {
      console.log(key, val);
      queryStr[key] = { $regex: `${val}`, $options: 'i' };
    }

    console.log(queryStr);

    
    this.query = this.query.find(queryStr);

    return this;
  }

  // ?sort=-title,plays
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-plays title');
    }

    return this;
  }

  // ?fields=plays,title,target,createdAt
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  // ?page=1&limit=25
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    // need some error handler requesting pages out of range
    // below doesnt work
    // if (this.queryString.page) {
    //   const numLessons = await Lessons.countDocuments();
    //   if (skip > numTours) throw new Error('No more documents');
    // }

    return this;
  }
}

module.exports = APIFeatures;
