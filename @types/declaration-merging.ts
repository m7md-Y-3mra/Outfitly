export interface MyEnvs {
  DATABASE_URL: string;
  S3_BUCKET_NAME: string;
}

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace NodeJS {
    interface ProcessEnv extends MyEnvs {}
  }
}
