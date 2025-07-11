import { flow } from "fp-ts/lib/function";
import { emptyDB, writeDB } from "../db";
import { returnSuccess } from "./utils";

export const init = flow(
  () => emptyDB,
  writeDB,
  returnSuccess("Database successfully created"),
);
