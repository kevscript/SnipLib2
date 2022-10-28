import * as yup from "yup";

const yupTag = yup
  .string()
  .min(2, "Min tag length : 2 chars")
  .max(32, "Max tag length : 32 chars")
  .required();

export const snippetSchema = yup.object({
  title: yup.string().required("Title is required").max(80),
  listId: yup.string().required(),
  description: yup.string(),
  tags: yup.array().of(yupTag).max(5),
  language: yup.string().required(),
  content: yup.string().max(1028).required("Snippet is empty"),
});

export type SnippetSchema = yup.InferType<typeof snippetSchema>;
