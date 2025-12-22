import { getEnvOrDefault } from "@/utils/env.utils";

export const S3_BUCKET_NAME = getEnvOrDefault("S3_BUCKET_NAME", "outfitly"); // getEnvOrThrow("S3_BUCKET_NAME");
