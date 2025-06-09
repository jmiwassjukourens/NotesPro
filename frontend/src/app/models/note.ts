import { Tag } from "./tag";

export interface Note {
  id: number;
  title: string;
  content: string;
  archived: boolean;
  tags: Tag[];
}
