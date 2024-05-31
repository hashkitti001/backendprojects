const mongoose = require("mongoose")
const {Schema} = mongoose;

const userSchema = new Schema(
    {
        "username": {
            type: String,
            unique: true,
        },
        "password": {
            type: String,
            required:true
        },
        
    }
)
const User = mongoose.model("Users", userSchema)
module.exports = User