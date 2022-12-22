export type SectionTypeId = "header" | "paragraph";

interface SectionType {
  type: SectionTypeId;
  name: string;
}

export const sectionTypes: SectionType[] = [
  {
    type: "header",
    name: "Header",
  },
  {
    type: "paragraph",
    name: "Paragraph",
  },
];

interface SectionData {
  id: string;
  type: SectionTypeId;
}

export interface Header extends SectionData {
  type: "header";
  header: string;
}

export interface Paragraph extends SectionData {
  type: "paragraph";
  contents: string;
}

export type Section = Header | Paragraph;

export const isHeader = (s: Section): s is Header => s.type === "header";
export const isParagraph = (s: Section): s is Paragraph =>
  s.type === "paragraph";
