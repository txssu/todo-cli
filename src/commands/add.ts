import type { Task } from "../models/task";
import * as T from "fp-ts/Task";
import * as uuid from "uuid";
import { readDB, writeDB } from "../db";

const buildTask = (title: string): Task => ({
  id: uuid.v4(),
  title,
  completed: false,
});

export const add = (commandInput: string[]) =>
  T.chain((db: Task[]) =>
    T.map(() => "Task added")(
      writeDB([...db, buildTask(commandInput.join(" "))]),
    ),
  )(readDB);
