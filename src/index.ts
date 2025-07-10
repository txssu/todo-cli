import readlineSync from "readline-sync";

import * as O from "fp-ts/Option";
import * as TE from "fp-ts/TaskEither";

import { add } from "./commands/add";
import { list } from "./commands/list";
import { init } from "./commands/init";
import { pipe } from "fp-ts/lib/function";

type Command = (userInput: string[]) => TE.TaskEither<string, string>;

const commandsMap: Record<string, Command> = {
  add: add,
  list: list,
  init: init,
};

const readline = () => TE.of(readlineSync.question(">>>").split(" "));

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

const handleResult = TE.match(console.error, console.log);

async function main() {
  for (;;) {
    const task = pipe(readline(), handleCommand, handleResult);
    await task();
  }
}

void main();
