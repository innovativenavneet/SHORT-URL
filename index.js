const express = require("express");
const {connectMongoDB} = require("./connection");
const app = express();


const urlRoute = require("./routes/url");
const URL = require('./models/url')
const PORT = 3001;

connectMongoDB("mongodb://localhost:27017/short-url").then(()=>console.log("mongoDB connected"));
// connectMongoDb("mongodb://127.0.0.1:27017/short-url");

app.use(express.json());
app.use("/url",urlRoute);

app.get('/:shortId',async(req,res)=>{
 const shortId = req.params.shortId;

 const entry =  await URL.findOneAndUpdate(
    {
        shortId,
    },
    {
        $push:{
            visitHistory:{
                timestamp: Date.now(),
            } 
        }
    }
 );
})

// our app will listen to this port 
app.listen(PORT, ()=> console.log(`Server Started at port at ${PORT}`));



