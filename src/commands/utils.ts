import { constant, flow } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";

export type Command = (userInput: string[]) => TE.TaskEither<string, string>;

export const returnSuccess = flow(constant, TE.map);
