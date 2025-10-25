declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_CLUSTER_URL: string;
      DB_NAME?: string;
      USER_DB_NAME?: string;
      NODE_ENV: "development" | "production" | "test";
      PORT?: string;
    }
  }
}

export {};
