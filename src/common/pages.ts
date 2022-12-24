import { Section } from "./sections";

export interface Page {
  id: string;
  title: string;
  description: string;
  backgroundImage?: string; // media id
  subpages: string[]; // page id
  sections: Section[];
}
