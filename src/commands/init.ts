import { constant, flow } from "fp-ts/function";
import { emptyDB, writeDB } from "../db";
import { returnSuccess } from "./utils";

export const init = flow(
  constant(emptyDB),
  writeDB,
  returnSuccess("Database successfully created"),
);
