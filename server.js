const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");

dotenv.config({path: "config.env"});

const DB = process.env.DATABASE;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Database connection successful");
})

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
});
// hadling unhandled rejections
process.on('unhandledRejection',err => {
    server.close(() => {
        process.exit(1); 
    })
});

// hadling unhandled Exceptions
process.on('uncaughtException',err => {
    server.close(() => {
        process.exit(1); 
    })
});