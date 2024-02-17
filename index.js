// importing express and creating instance of express(app)
const express = require("express");
const app = express();

// loading the .env data in the process object
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// adding middleware parser
app.use(express.json());

// importing all the routes
const blog = require("./routes/blog");

// mounting api
app.use("/api/v1",blog);

// connecting database
const dbConnect = require("./config/database");
dbConnect();

// listening to port
app.listen(PORT , ()=>{
    console.log(`server started at port ${PORT}`);
})

// default route
app.get("/", (req , res)=>{
    res.send(`<h1>Blog Application home page<h1>`)
})