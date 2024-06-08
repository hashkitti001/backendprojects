const express = require("express");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./utils/dbConnect");
const noteRouter = require("./routes/noteRoutes");
const app = express();
const PORT = process.env.PORT || 3333;

// Middleware setup
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Notes router 
app.use(noteRouter)
// Database connection
dbConnect();


// Start the server
app.listen(PORT, () => {
    console.info(`Markdown notes API is running on port ${PORT}`);
});
