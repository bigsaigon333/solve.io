declare global {
  namespace NodeJS {
    interface ProcessEnv {
      INIT_CWD: string;
    }
  }
}

export {};
