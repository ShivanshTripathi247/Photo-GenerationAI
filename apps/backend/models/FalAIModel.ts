import { BaseModel } from "./BaseModel";
import { fal } from "@fal-ai/client";


export class FalAIModel extends BaseModel {
    constructor() {
        super()
    } 

    public async generateImage(prompt: string, tensorPath: string) {
        if (process.env.TEST_MODE) {
            // Mock response for testing
            return {
                request_id: `mock-gen-${Date.now()}`,
                response_url: "https://example.com/mock-generation"
            };
        }

        const { request_id, response_url } = await fal.queue.submit("fal-ai/flux-lora", {
            input: {
              prompt: prompt,
              loras: [{ path: tensorPath, scale: 1 }]
            },
            webhookUrl: `${process.env.WEBHOOK_BASE_URL}/fal-ai/webhook/image`
        });
        return { request_id, response_url }
    }

    public async trainModel(zipUrl: string, triggerWord: string) {
        if (process.env.TEST_MODE) {
            // Mock response for testing
            return {
                request_id: `mock-${Date.now()}`,
                response_url: "https://example.com/mock-training"
            };
        }

        const { request_id, response_url } = await fal.queue.submit("fal-ai/flux-lora-fast-training", {
            input: {
                images_data_url: zipUrl,
                trigger_word: triggerWord
            },
            webhookUrl: `${process.env.WEBHOOK_BASE_URL}/fal-ai/webhook/train`,
        });

        return { request_id, response_url };
    }   
}