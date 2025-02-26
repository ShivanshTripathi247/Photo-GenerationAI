import type { z } from "zod"
import { TrainModel, GenerateImage, GenerateImagesFromPack } from "./types"

export type TrainModalInput = z.infer<typeof TrainModel>;
export type GenerateImageInput = z.infer<typeof GenerateImage>;
export type GenerateImagesFromPackInput = z.infer<typeof GenerateImagesFromPack>;
