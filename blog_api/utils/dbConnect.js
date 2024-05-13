require("dotenv").config()
const mongoose = require("mongoose")
/* 
- A function to initiate connection to the MongoDB database
*/
async function dbConnect (){
    await mongoose.connect(process.env.dbURI)
      
}
module.exports = dbConnect