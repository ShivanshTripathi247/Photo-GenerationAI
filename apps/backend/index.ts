import express from "express";
import { TrainModel,GenerateImage,GenerateImagesFromPack } from "common/types";
import { prismaClient } from "db";
import { S3Client } from "bun";
import { FalAIModel } from "./models/FalAIModel";

const USER_ID = "1234";
const PORT = process.env.PORT || 8080;

const falAiModel = new FalAIModel();

const app = express();
app.use(express.json())

app.get("/pre-signed-url", async (req, res) => {
    const key = `models/${Date.now()}_${Math.random()}.zip`;
    const url = S3Client.presign(`models/${Date.now()}_${Math.random()}.zip`, {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
        endpoint: process.env.ENDPOINT,
        bucket: process.env.BUCKET_NAME,
        expiresIn: 60 * 5
    })

    res.json({
        url,
        key
    })
})

app.post("/ai/training", async (req,res) => {
    const parsedBody = TrainModel.safeParse(req.body)

    if (!parsedBody.success) {
        res.status(411).json({
            message: "Input Incorrect"
        })
        return
    }

    const { request_id, response_url } = await falAiModel.trainModel(parsedBody.data.zipUrl, parsedBody.data.name);

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
            zipUrl: parsedBody.data.zipUrl,
            falAiRequestId: request_id,
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
    const model = await prismaClient.model.findUnique({
        where: {
            id: parsedBody.data.modelId
        }
    })

    if (!model || !model.tensorPath) {
        res.status(411).json({
            message: "Model not found"
        })
        return;
    }

    const { request_id, response_url } = await falAiModel.generateImage(parsedBody.data.prompt, model?.tensorPath);

    const data = await prismaClient.outputImages.create({
        data: {
            prompt: parsedBody.data?.prompt,
            userId: USER_ID,
            modelId: parsedBody.data.modelId,
            imageUrl: "",
            falAiRequestId: request_id
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

    let requestIds: { request_id: string }[] = await Promise.all(
        prompts.map(async (prompt) => falAiModel
        .generateImage(prompt.prompt, parseBody.data.modelId)));

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

app.post("/fal-ai/webhook/train", async (req,res) => {
    //update the status of the image in the DB
    const requestId = req.body.request_id

    await prismaClient.model.updateMany({
        where:{
            falAiRequestId: requestId
        },
        data:{
            trainingStatus: "Generated",
            tensorPath: req.body.tensor_path
        }
    })
    res.json({
        message: "Webhook received"
    })    
})

app.post("/fal-ai/webhook/image", async (req,res) => {
    console.log(req.body);
    //update the status of the image in the DB
    const requestId = req.body.request_id;

    await prismaClient.outputImages.updateMany({
        where: {
            falAiRequestId: requestId
        },
        data: {
            status: "Generated",
            imageUrl: req.body.image_url
        }
    })
    res.json({
        message: "Webhook received"
    })    
})

app.listen(8080, () => {
    console.log("Sever is running on port 8080 \nhttp://localhost:8080");
    
})