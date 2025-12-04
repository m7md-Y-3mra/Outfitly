export interface MyEnvs {
  DATABASE_URL: string;
}

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace NodeJS {
    interface ProcessEnv extends MyEnvs {}
  }
}
