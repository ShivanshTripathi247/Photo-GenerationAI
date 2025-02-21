import express from "express";
import { TrainModel,GenerateImage,GenerateImagesFromPack } from "common/types";
import { prismaClient } from "db";

const USER_ID = "1234";
const PORT = process.env.PORT || 8080;



const app = express();

app.get("/", (req,res) => {
    res.send("Hello World");
});

app.post("/ai/training", async (req,res) => {
    const parsedBody = TrainModel.safeParse(req.body)

    if (!parsedBody.success) {
        res.status(411).json({
            message: "Input Incorrect"
        })
        return
    }

    const data = await prismaClient.model.create({
        data: {
            //1:12:10
            name: parsedBody.data.name,
            type: parsedBody.data.type,
            age: parsedBody.data.age,
            ethenecity: parsedBody.data.ethenecity,
            eyeColor: parsedBody.data.eyeColor,
            bald: parsedBody.data.bald,
            userId: USER_ID,
        }
    })

    res.json({
        modelId: data.id
    })
})

app.post("/ai/generate", async (req,res) => {
    const parsedBody = GenerateImage.safeParse(req.body)

    if (!parsedBody.success) {
        res.status(411).json({

        })
        return;
    }

    const data = await prismaClient.outputImages.create({
        data: {
            prompt: parsedBody.data?.prompt,
            userId: USER_ID,
            modelId: parsedBody.data.modelId,
            imageUrl: "",
        }
    })
})

app.post("/pack/generate", async (req,res) => {
    const parseBody = GenerateImagesFromPack.safeParse(req.body)

    if (!parseBody.success) {
        res.status(411).json({
            message: "Input Incorrect"
        })
        return;
    }

    const prompts = await prismaClient.packPrompts.findMany({
        where: {
            packId: parseBody.data.packId
        }
    })

    const images = await prismaClient.outputImages.createManyAndReturn({
        data: prompts.map((prompt) => ({
            prompt: prompt.prompt,
            userId: USER_ID,
            modelId: parseBody.data.modelId,
            imageUrl: "",
        }))
    })

    res.json({
        images: images.map((image) => image.id)
    })

})

app.get("/pack/bulk", async (req,res) => {

    const packs = await prismaClient.packs.findMany({})

    res.json({
        packs
    })
})

app.get("/image/bulk", async (req,res) => {
    const ids = req.query.images as string[]
    const limit = req.query.limit as string ?? "10";
    const offset = req.query.offset as string ?? "0";
    
    const imagesData = await prismaClient.outputImages.findMany({
        where: {
            id: { in: ids },
            userId: USER_ID,
        },
        skip: parseInt(offset),
        take: parseInt(limit)
    })

    res.json({
        images: imagesData
    })
})

app.post("/fal-ai/webhook", async (req,res) => {
    console.log(req.body);
    //update the status of the image in the DB
    res.json({
        message: "Webhook received"
    })
    
})

app.listen(8080, () => {
    console.log("Sever is running on port 8080 \nhttp://localhost:8080");
    
})