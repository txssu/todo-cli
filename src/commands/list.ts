import type { Task } from "../models/task";
import * as TE from "fp-ts/TaskEither";
import { readDB } from "../db";

const formatTask = (task: Task) =>
  `${task.completed ? "DONE" : "TODO"} ${task.title}`;

export const list = () =>
  TE.map((db: Task[]) => db.map(formatTask).join("\n"))(readDB);
