export type Snippet = {
  id: string;
  title: string;
  description: string;
  content: string;
  language: string;
  tags: string[];
  createdAt: any;
  updatedAt: any;
  favorite: boolean;
  public: boolean;
};

export const snippets: Snippet[] = [
  {
    id: "1",
    title: "title",
    description: "description",
    content: "<h1>Hello World</h1>",
    favorite: false,
    language: "HTML",
    public: false,
    tags: ["html", "hello"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "2",
    title: "title",
    description: "description",
    content: "<h1>Hello World</h1>",
    favorite: false,
    language: "HTML",
    public: false,
    tags: ["html", "hello"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "3",
    title: "title",
    description: "description",
    content: "<h1>Hello World</h1>",
    favorite: false,
    language: "HTML",
    public: false,
    tags: ["html", "hello"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "4",
    title: "title",
    description: "description",
    content: "<h1>Hello World</h1>",
    favorite: false,
    language: "HTML",
    public: false,
    tags: ["html", "hello"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "5",
    title: "title",
    description: "description",
    content: "<h1>Hello World</h1>",
    favorite: false,
    language: "HTML",
    public: false,
    tags: ["html", "hello"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];
