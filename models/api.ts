import * as z from "zod";

export const EditSnippetFields = z.object({
  listId: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  language: z.string().min(1).optional(),
  description: z.string().optional(),
  content: z.string().min(1).optional(),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
  favorite: z.boolean().optional(),
  public: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

export type EditSnippetFields = z.infer<typeof EditSnippetFields>;
