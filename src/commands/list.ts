import type { Task } from "../models/task";
import * as TE from "fp-ts/TaskEither";
import { readDB } from "../db";
import { pipe } from "fp-ts/lib/function";

const formatTask = (task: Task) =>
  `${task.completed ? "DONE" : "TODO"} ${task.title}`;

const formatDB = (db: Task[]) => db.map(formatTask).join("\n");

export const list = () => pipe(readDB, TE.map(formatDB));
