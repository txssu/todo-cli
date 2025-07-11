import * as IO from "fp-ts/IO";
import { constUndefined } from "fp-ts/function";
import readlineSync from "readline-sync";

export const readLine = (prompt: string) =>
  IO.of(readlineSync.question(prompt));

type LogType = "log" | "error";

const unsafeWriteLineAs = (type: LogType) => (data: string) => {
  if (type === "error") console.error(data);
  else console.log(data);

  return constUndefined;
};

export const writeLineAs: (
  type: LogType,
) => (data: string) => IO.IO<undefined> = unsafeWriteLineAs;
