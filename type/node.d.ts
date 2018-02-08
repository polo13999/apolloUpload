declare namespace NodeJS {
  interface Global {
    fetch: () => Promise<any>;
  }
  interface Process {
    browser: string;
  }
}