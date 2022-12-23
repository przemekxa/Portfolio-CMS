export type SectionTypeId = "header" | "paragraph" | "richText";

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
  {
    type: "richText",
    name: "Rich Text Editor",
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

export interface RichText extends SectionData {
  type: "richText";
  value: string;
}

export type Section = Header | Paragraph | RichText;

export const isHeader = (s: Section): s is Header => s.type === "header";
export const isParagraph = (s: Section): s is Paragraph =>
  s.type === "paragraph";
export const isRichText = (s: Section): s is RichText => s.type === "richText";
