import { Section } from "./sections";

export interface Page {
  id: string;
  title: string;
  description: string;
  backgroundImage?: string; // media id
  subpages: string[]; // page id
  sections: Section[];
}

export const createDefaultPage = (): Page => ({
  id: "",
  title: "",
  description: "",
  subpages: [],
  sections: [],
});
