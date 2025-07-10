import type { Task } from "../models/task";
import * as uuid from "uuid";
import { putTaskDB } from "../db";
import { pipe } from "fp-ts/lib/function";
import { returnSuccess } from "./utils";

const buildTask = (title: string): Task => ({
  id: uuid.v4(),
  title,
  completed: false,
});

export const add = (commandInput: string[]) =>
  pipe(
    commandInput.join(" "),
    buildTask,
    putTaskDB,
    returnSuccess("Task successfully added"),
  );
