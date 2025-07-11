import * as O from "fp-ts/Option";
import * as IO from "fp-ts/IO";
import * as T from "fp-ts/Task";
import * as TE from "fp-ts/TaskEither";

import { add } from "./commands/add";
import { list } from "./commands/list";
import { init } from "./commands/init";
import { flow, pipe } from "fp-ts/function";
import { readLine, writeLine } from "./cli";

type Command = (userInput: string[]) => TE.TaskEither<string, string>;

const commandsMap: Record<string, Command> = {
  add: add,
  list: list,
  init: init,
};

const words = (s: string) => s.split(" ");

const requestUserInput = () => pipe(">>> ", readLine, IO.map(words), TE.fromIO);

const handleCommand = TE.flatMap(([strCommand, ...userInput]: string[]) =>
  pipe(strCommand, toCommand, execCommand(userInput)),
);

const toCommand = (value?: string) =>
  pipe(
    value,
    O.fromNullable,
    O.chainNullableK((k) => commandsMap[k]),
  );

const execCommand = (userInput: string[]) =>
  O.match(
    () => TE.left("Command not found"),
    (command: Command) => command(userInput),
  );

const writeOutput = flow(writeLine, T.fromIO);
const writeError = flow((s: string) => writeLine(s, "error"), T.fromIO);

const handleResult = TE.matchE(writeError, writeOutput);

async function main() {
  for (;;) {
    const task = pipe(requestUserInput(), handleCommand, handleResult);
    await task();
  }
}

void main();
