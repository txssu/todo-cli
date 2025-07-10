import type { Task } from "../models/task";
import * as TE from "fp-ts/TaskEither";
import * as uuid from "uuid";
import { readDB, writeDB } from "../db";

const buildTask = (title: string): Task => ({
  id: uuid.v4(),
  title,
  completed: false,
});

export const add = (commandInput: string[]) =>
  TE.chain((db: Task[]) =>
    TE.map(() => "Task added")(
      writeDB([...db, buildTask(commandInput.join(" "))]),
    ),
  )(readDB);
