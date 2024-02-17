// importing mongoose 
const mongoose = require('mongoose');

// loading the .env file data into the process object
require('dotenv').config();

// function which is used to establish connection between server and database
const dbConnect = () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{
        console.log("Database and server connected sucessfully :-)");
    })
    .catch((err)=>{
        console.log("error :-( ");
        console.log(err);
        process.exit(1);
        // process.exit(1) means process exit with some failure
        // process.exit(0) means process exit without any failure
    })
}

// exporting the fuction
module.exports = dbConnect;