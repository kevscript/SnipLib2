import { Toast } from "@/hooks/useToasts";

export const mockToasts: Toast[] = [
  {
    id: 1,
    title: "Toast 1",
    type: "success",
  },
  {
    id: 2,
    title: "Toast 2",
    type: "fail",
  },
  {
    id: 3,
    title: "Toast 3",
    type: "neutral",
  },
];
