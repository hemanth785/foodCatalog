PROJECT START STEPS:

    Pre-requisites:
    1. Install node, npm, mongoDB on system
    2. Run this script to load food catalog data into database
        - node loadCatalog.js

    Steps:
    1. To run this application, do the following:
        1.a. Go to the project root directory.
        1.b. Run the following commands respectively in the terminal/command line to build and run the app:
            - npm install
            - npm start or nodemon server.js

APIS 
1. getting the list of food items with filters such as sort, page, search, limiit
    - localhost:8000/api/v1/food - GET - without any filters
    - localhost:8000/api/v1/food?sort=cost&search=indian - GET - with sort based on cost and search text 'Indian'
    - localhost:8000/api/v1/food?sort=cost&limit=2&page=2&search=indian

2. Placing the order for one or more items in the list
    - localhost:8000/api/v1/order - POST 
    - input format:

        {
            "user_name" : "Hemanth R H",
            "subtotal" : 300,
            "orderItems" : [
                    {
                        "foodid" : "5ffde58d2163b83b86087353",
                        "quantity" : 2
                    },
                    {
                        "foodid" : "5ffde58d2163b83b860872a0",
                        "quantity" : 3
                    }
                ]
        }   