const Food = require("../models/foodModel");
const APIfeatures = require("./../utils/apiFeatures");

// exports.createTour = catchAsync( async (req,res,next) => {
//     try {
//         const newTour = await Tour.create(req.body);
//         res.status(201).json({
//             status: "success",
//             data: newTour
//         });
//     } catch (error) {
//         res.send(error);
//     }
// });

// exports.aliasTopTours = catchAsync( async (req, res, next) => {
//     req.query.limit = '5';
//     req.query.sort = 'ratingsAverage,price';
//     next();
// });

exports.getFoodCatalog = async (req, res, next) => {
    
    try {
        const features = new APIfeatures(Food.find(),req.query)
            .filter()
            .sort()
            .limit()
            .paginate()
            .search();
        const foodCatalog = await features.query;
        
        //SENDING RESPONSE
        res.status(201).json({
            status: "success",
            results: foodCatalog.length,
            data: {
                foodCatalog: foodCatalog
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "failure"
        });
    }
        
}

exports.addFood = async (req,res,next) => {
    try {
        const newFood = await Food.create(req.body);
        res.status(201).json({
            status: "success",
            data: newFood
        });
    } catch (error) {
        res.send(error);
    }
}





