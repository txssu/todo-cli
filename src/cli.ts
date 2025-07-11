import * as IO from "fp-ts/IO";
import readlineSync from "readline-sync";

export const readLine = (prompt: string) =>
  IO.of(readlineSync.question(prompt));

type LogType = "log" | "error";

export const writeLine =
  (data: string, type: LogType = "log"): IO.IO<void> =>
  () => {
    if (type === "error") console.error(data);
    else console.log(data);
  };
