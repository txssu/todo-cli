import readlineSync from "readline-sync";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import { match, P } from "ts-pattern";
import { add } from "./commands/add";
import { list } from "./commands/list";
import { init } from "./commands/init";

const handleResult = E.fold(console.error, console.log);

const buildCommandHandler = (words: string[]): TE.TaskEither<string, string> =>
  match(words)
    .with(["add", ...P.array()], ([, ...rest]) => add(rest))
    .with(["list"], () => list)
    .with(["init"], () => init)
    .with(P._, () => TE.left("Command not found"))
    .exhaustive();

async function main() {
  for (;;) {
    const words = readlineSync.question(">>>").split(" ");
    const handleCommand = buildCommandHandler(words);
    const result = await handleCommand();
    handleResult(result);
  }
}

void main();
