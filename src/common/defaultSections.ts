import { v4 as uuidv4 } from "uuid";
import { Header, Paragraph, RichText, SectionTypeId } from "./sections";

export const createDefaultSection = (sectionType: SectionTypeId) => {
  const id = uuidv4();
  switch (sectionType) {
    case "header":
      const headerSection: Header = {
        id,
        type: "header",
        header: "",
      };
      return headerSection;

    case "paragraph":
      const paragraphSection: Paragraph = {
        id,
        type: "paragraph",
        contents: "",
      };
      return paragraphSection;

    case "richText":
      const richText: RichText = {
        id,
        type: "richText",
        value: "",
      };
      return richText;

    default:
      const _exhaustiveCheck: never = sectionType;
      return _exhaustiveCheck;
  }
};
