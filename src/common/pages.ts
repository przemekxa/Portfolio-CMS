import { Section } from "./sections";

export interface PageSummary {
  id: string;
  title: string;
  description: string;
  backgroundImage?: string;
}

export interface Page extends PageSummary {
  subpages: string[]; // page id
  sections: Section[];
}

export interface PageSummary {
  id: string;
  title: string;
  description: string;
  backgroundImage?: string;
}

export const createDefaultPage = (): Page => ({
  id: "",
  title: "",
  description: "",
  subpages: [],
  sections: [],
});
