export type Snippet = {
  id: string;
  title: string;
  description: string;
  content: string;
  language: string;
  tags: string[];
  created_at: any;
  updated_at: any;
  favorite: boolean;
  public: boolean;
};

export const snippets = [
  {
    id: "1",
    title: "title",
    description: "description",
    content: "<h1>Hello World</h1>",
    favorite: false,
    language: "HTML",
    public: false,
    tags: ["html", "hello"],
    created_at: Date.now(),
    updated_at: Date.now(),
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
    created_at: Date.now(),
    updated_at: Date.now(),
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
    created_at: Date.now(),
    updated_at: Date.now(),
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
    created_at: Date.now(),
    updated_at: Date.now(),
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
    created_at: Date.now(),
    updated_at: Date.now(),
  },
];
