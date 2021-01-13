class APIfeatures {
    constructor(query,queryString)
    {
        this.query = query;
        this.queryString = queryString;
    }

    filter()
    {
        //BUILDING QUERY
        const queryObject = {...this.queryString};

        //removing paging and sorting parameters
        const excludedQuery = ['page','sort','limit','fields','search'];
        excludedQuery.forEach(el => delete queryObject[el]);

        //modifying filtering parameterts ready for operations
        let queryString = JSON.stringify(queryObject);
        queryString = queryString.replace(/\b(lt|lte|gt|gte)\b/g, match => `$${match}`);
        this.query.find(JSON.parse(queryString));

        return this; 
    }

    sort(){
        if(this.queryString.sort)
        {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("-createdAt");
        }

        return this;
    }
    limit()
    {
        if(this.queryString.fields)
        {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query  = this.query.select(fields)
        } else {
            this.query  = this.query.select("-__v");
        }
        return this;
    }
    paginate(){
        const page = this.queryString.page * 1 || 1 ;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page-1) * limit

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
    search(){
        if(this.queryString.search){
            const searchText = this.queryString.search;
            const searchRegex = new RegExp(searchText, 'i')
            this.query.find({$or:[{"food_type" : { $regex: searchRegex }}, {"name" : { $regex: searchRegex }}, {"cuisine" : { $regex: searchRegex }}]});
        }

        return this;
    }
}

module.exports = APIfeatures;