import express from "express";
import { TrainModel,GenerateImage,GenerateImagesFromPack } from "common/types";

const PORT = process.env.PORT || 8080;


const app = express();

app.get("/", (req,res) => {
    res.send("Hello World");
});

app.post("/ai/generate", (req,res) => {

})

app.post("/pack/generate", (req,res) => {
    
})

app.get("/pack/build", (req,res) => {
    
})

app.get("/image", (req,res) => {
    
})

app.listen(3000, () => {
    console.log("Sever is running on port 8080 ");
    
})