import * as O from "fp-ts/Option";
import * as IO from "fp-ts/IO";
import * as T from "fp-ts/Task";
import * as TE from "fp-ts/TaskEither";

import { add } from "./commands/add";
import { list } from "./commands/list";
import { init } from "./commands/init";
import type { Command } from "./commands/utils";
import { flow, pipe, constant } from "fp-ts/function";
import { readLine, writeLineAs } from "./cli";
import { words } from "./utils";

const commandsMap: Record<string, Command> = {
  add: add,
  list: list,
  init: init,
};

const commandNotFoundError = pipe("Command not found", TE.left, constant);

const writeOutput = flow(writeLineAs("log"), T.fromIO);
const writeError = flow(writeLineAs("error"), T.fromIO);
const handleResult = TE.matchE(writeError, writeOutput);

const execCommand = (userInput: string[]) => (command: Command) =>
  command(userInput);

const toCommand: (value?: string) => O.Option<Command> = flow(
  O.fromNullable,
  O.chainNullableK((k) => commandsMap[k]),
);

const handleCommand = TE.flatMap(([strCommand, ...userInput]: string[]) =>
  pipe(
    strCommand,
    toCommand,
    O.match(commandNotFoundError, execCommand(userInput)),
  ),
);

const requestUserInput = pipe(
  ">>> ",
  readLine,
  IO.map(words),
  TE.fromIO,
  constant,
);

const createTask = flow(requestUserInput, handleCommand, handleResult);

async function main() {
  for (;;) {
    const task = createTask();
    await task();
  }
}

void main();
