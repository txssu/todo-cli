import readlineSync from "readline-sync";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import { match, P } from "ts-pattern";
import { add } from "./commands/add";
import { list } from "./commands/list";
import { init } from "./commands/init";

const maybeHandleError = E.fold(
  (errorMsg) => console.error("ERROR", errorMsg),
  (value) => console.log(value),
);

const buildCommandHandler = (words: string[]): TE.TaskEither<string, string> =>
  match(words)
    .with(["add", ...P.array()], ([_, ...rest]) => add(rest))
    .with(["list"], ([_]) => list)
    .with(["init"], ([_]) => init)
    .with(P._, (_) => TE.of("Command not found"))
    .exhaustive();

async function main() {
  for (;;) {
    const words = readlineSync.question(">>>").split(" ");
    const handleCommand = buildCommandHandler(words);
    const result = await handleCommand();
    maybeHandleError(result);
  }
}

main();
