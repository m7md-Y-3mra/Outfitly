import { getEnvOrThrow } from "@/utils/env.utils";

export const DATABASE_URL = getEnvOrThrow("DATABASE_URL");
