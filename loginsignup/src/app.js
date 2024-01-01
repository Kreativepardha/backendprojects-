const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const bcrypt = require('bcrypt');


const templatePath = path.join(__dirname,"../templates"); 

const collection1 = require("./mongodb");

// app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.set("view engine" , "ejs");
app.set("views" , templatePath);

app.use(express.static("public"));


app.get('/', (req, res) => {
    res.render("login");
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.get('/signup', (req, res) => {
    res.render("signup");
});

app.get('/home', (req, res) => {
    res.render("home");
});


app.post("/signup",async (req,res)=>{

    const data ={
        name:req.body.name,
        password:req.body.password
    }
    console.log("Received data:", data);

    const existingUser = await collection1.findOne({name: data.name});
    if(existingUser){
        res.send("user already existssss");
    } else{
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        // await collection1.create(data);

        await collection1.create({
            name: data.name,
            password: hashedPassword
        });

        res.redirect("login");

        // res.redirect("login");
    } catch (error) {
        console.error("Error saving data to MongoDB:", error);
        res.render("signup", { error });
    }

}
})

app.post("/login", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };
    console.log("Received data:", data);

    try {
        // Find user by name (assuming name is the correct field in your database)
        const existingUser = await collection1.findOne({ name: data.name });
 
        if (existingUser) {
            console.log("Existing user:", existingUser);

            // Compare provided password with the hashed password in the database
            const passwordMatch = await bcrypt.compare(data.password, existingUser.password);

            if (passwordMatch) {
                res.render("home");
            } else {
                console.log("Wrong password");
                res.send("Wrong password");
            }
        } else {
            console.log("User not found");
            res.send("User not found");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.send("An error occurred during login");
    }
});


app.listen(1000,()=>{
    console.log("port connected :");
})