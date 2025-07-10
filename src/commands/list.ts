import type { Task } from "../models/task";
import * as T from "fp-ts/Task";
import { readDB } from "../db";

const formatTask = (task: Task) =>
  `${task.completed ? "DONE" : "TODO"} ${task.title}`;

export const list = () =>
  T.map((db: Task[]) => db.map(formatTask).join("\n"))(readDB);
