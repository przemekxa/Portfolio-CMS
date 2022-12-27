export type SectionTypeId = "pageHeader" | "header" | "1image" | "2images" | "paragraph" | "richText" | "paragraphImage" | "subpageCarousel" | "contact";

interface SectionType {
  type: SectionTypeId;
  name: string;
}

export const sectionTypes: SectionType[] = [
  {
    type: "pageHeader",
    name: "Page Header"
  },
  {
    type: "header",
    name: "Header",
  },
  {
    type: "1image",
    name: "One Image"
  },
  {
    type: "2images",
    name: "Two Images"
  },
  {
    type: "paragraph",
    name: "Paragraph",
  },
  {
    type: "richText",
    name: "Rich Text",
  },
  {
    type: "paragraphImage",
    name: "Paragraph with an Image",
  },
  {
    type: "subpageCarousel",
    name: "Subpage Carousel",
  },
  {
    type: "contact",
    name: "Contact",
  },
];

interface SectionData {
  id: string;
  type: SectionTypeId;
}

export interface PageHeader extends SectionData {
  type: "pageHeader";
  showCard: boolean;
}

export interface Header extends SectionData {
  type: "header";
  header: string;
}

export interface OneImage extends SectionData {
  type: "1image";
  title: string;
  src: string;
}

interface ImageData {
  title: string;
  src: string;
}

export interface TwoImages extends SectionData {
  type: "2images";
  images: ImageData[];
}

export interface Paragraph extends SectionData {
  type: "paragraph";
  contents: string;
}

export interface RichText extends SectionData {
  type: "richText";
  value: string;
}

export interface ParagraphImage extends SectionData {
  type: "paragraphImage";
  paragraph: string;
  image: string;
}

export interface SubpageCarousel extends SectionData {
  type: "subpageCarousel";
}

type SocialMediaIcon = "facebook" | "twitter" | "linkedin" | "github" | "pinterest" | "steam" | "medium" | "quora" | "reddit" | "snapchat" | "spotify" | "telegram" | "amazon" | "imdb" | "skype" | "tumblr" | "whatsapp" | "youtube" | "flickr" | "gitlab" | "instagram" | "slack";

interface SocialMedia {
  icon: SocialMediaIcon;
  href: string;
}

export interface Contact extends SectionData {
  type: "contact";
  phone: string;
  email: string;
  address: string;
  socialHeader: string;
  social: SocialMedia[];
}

export type Section = PageHeader | Header | OneImage | TwoImages | Paragraph | RichText | ParagraphImage | SubpageCarousel | Contact;

export const isPageHeader = (s: Section): s is PageHeader => s.type === "pageHeader";
export const isHeader = (s: Section): s is Header => s.type === "header";
export const isOneImage = (s: Section): s is OneImage => s.type === "1image";
export const isTwoImages = (s: Section): s is TwoImages => s.type === "2images";
export const isParagraph = (s: Section): s is Paragraph => s.type === "paragraph";
export const isRichText = (s: Section): s is RichText => s.type === "richText";
export const isParagraphImage = (s: Section): s is ParagraphImage => s.type === "paragraphImage";
export const isSubpageCarousel = (s: Section): s is SubpageCarousel => s.type === "subpageCarousel";
export const isContact = (s: Section): s is Contact => s.type === "contact";
