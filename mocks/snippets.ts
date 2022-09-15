export type Snippet = {
  _id: any;
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
    _id: "1",
    title: "title",
    description: "description",
    content: "<h1>Hello World 1</h1>",
    favorite: false,
    language: "HTML",
    public: false,
    tags: ["html", "hello"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "2",
    title: "title",
    description: "description",
    content: "<h1>Hello World 2</h1>",
    favorite: false,
    language: "HTML",
    public: false,
    tags: ["html", "hello"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "3",
    title: "title",
    description: "description",
    content: "<h1>Hello World 3</h1>",
    favorite: false,
    language: "HTML",
    public: false,
    tags: ["html", "hello"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "4",
    title: "title",
    description: "description",
    content: "<h1>Hello World 4</h1>",
    favorite: false,
    language: "HTML",
    public: false,
    tags: ["html", "hello"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "5",
    title: "title",
    description: "description",
    content: "<h1>Hello World 5</h1>",
    favorite: false,
    language: "HTML",
    public: false,
    tags: ["html", "hello"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];
