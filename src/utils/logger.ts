export class Logger {
  info(...args: any[]) {
    console.log(...args);
  }
  debug(...args: any[]) {
    console.log(...args);
  }
  warn(...args: any[]) {
    console.warn(...args);
  }
  error(...args: any[]) {
    console.error(...args);
  }
}

let logger: Logger | undefined = undefined;

export function getLogger(log?: Logger): Logger {
  if (!logger) logger = log ? log : new Logger();

  return logger;
}

export function setLogger(log: Logger): Logger {
  logger = log;
  return logger;
}
