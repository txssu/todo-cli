import type { Task } from "../models/task";
import * as uuid from "uuid";
import { putTaskDB } from "../db";
import { flow } from "fp-ts/lib/function";
import { returnSuccess } from "./utils";

const buildTask = (title: string): Task => ({
  id: uuid.v4(),
  title,
  completed: false,
});

const unwords = (s: string[]) => s.join(" ");

export const add = flow(
  unwords,
  buildTask,
  putTaskDB,
  returnSuccess("Task successfully added"),
);
