import { Descendant } from "slate";

export interface Note {
  id: string;
  content: Descendant[];
  createdAt: number;
  updatedAt: number;
}
