import * as TE from "fp-ts/TaskEither";

export const returnSuccess = (text: string) => TE.map(() => text);
