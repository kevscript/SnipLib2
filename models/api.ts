import * as z from "zod";

export const EditSnippetFields = z.object({
  _id: z.string().min(1),
  listId: z.string().min(1),
  title: z.string().min(1),
  language: z.string().min(1),
  description: z.string(),
  content: z.string().min(1),
  createdAt: z.number(),
  updatedAt: z.number(),
  favorite: z.boolean(),
  public: z.boolean(),
  tags: z.array(z.string()),
});

export type EditSnippetFields = z.infer<typeof EditSnippetFields>;

export const EditListFields = z.object({
  _id: z.string().min(1),
  label: z.string().min(1),
  original: z.boolean(),
  snippetIds: z.array(z.string()),
});

export type EditListFields = z.infer<typeof EditListFields>;
