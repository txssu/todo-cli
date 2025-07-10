import readlineSync from "readline-sync";
import * as T from "fp-ts/Task";
import { match, P } from "ts-pattern";
import { add } from "./commands/add";
import { list } from "./commands/list";

async function main() {
  for (;;) {
    const words = readlineSync.question(">>>").split(" ");

    const result = await match(words)
      .with(["add", ...P.array()], ([_, ...rest]) => add(rest))
      .with(["list", ...P.array()], ([_, ...rest]) => list())
      .with(P._, (_) => T.of("Command not found"))
      .exhaustive()();

    console.log(result);
  }
}

main();
