const mongoose = require("mongoose");

try {
    mongoose.connect("mongodb+srv://saradhipardha12:PARDHA123@cluster0.n0euu2z.mongodb.net/newpractices");

    console.log("MongoDB connected");
} catch (error) {
    console.error("Failed to connect to MongoDB:", error);
}


const loginSchema =  mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

const collection1 = new mongoose.model("collection1",loginSchema);

module.exports = collection1;