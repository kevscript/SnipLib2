import { ObjectID } from "bson";

export const mockSnippetIds: ObjectID[] = [...Array(5)].map(
  () => new ObjectID()
);

export const mockListIds: ObjectID[] = [...Array(5)].map(() => new ObjectID());
