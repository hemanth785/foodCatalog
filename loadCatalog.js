const food = require('./food.json');
const Food = require('./models/foodModel');
const mongoose = require('mongoose');
const { exists } = require('./models/foodModel');
const foodNameList = food.foodNameList;

const foodTypeArr = ['BreakFast','Lunch','Dinner','Snacks'];
const cuisineArr = ['Indian','Chinese','Italian','Mexican','Thai'];

const foodCatalog = [];

function randomNumber(min, max) {  
    return Math.round(Math.random() * (max - min) + min); 
} 

let count = 0
for(foodName of foodNameList){
    let name = foodName;
    // console.log(randomNumber(0, foodTypeArr.length-1));
    let foodType = foodTypeArr[randomNumber(0, foodTypeArr.length-1)];
    let cuisine = cuisineArr[randomNumber(0, cuisineArr.length-1)];
    let cost = randomNumber(100, 1000);
    let inventory_available = randomNumber(5, 100);
    foodItem = {
        name: name,
        foodType: foodType,
        cuisine: cuisine,
        cost: cost,
        inventory_available: inventory_available
    };
    // if(count > 10){
    //     break;
    // }
    foodCatalog.push(foodItem);
    count++;
}
const DB = 'mongodb://localhost:27017/food_catalog';
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Database connection successful");
    Food.collection.insertMany(foodCatalog, onInsert);
})


function onInsert(err, docs) {
    if (err) {
        console.log('Loading food catalog failed');
        process.exit(1)
    } else {
        console.info('%d food items were successfully stored.', foodCatalog.length);
        process.exit(0)
    }
}


 