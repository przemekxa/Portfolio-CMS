import { v4 as uuidv4 } from "uuid";
import { Header, Paragraph, SectionTypeId } from "./sections";

const generateEmptySection = (sectionType: SectionTypeId) => {
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

    default:
      const _exhaustiveCheck: never = sectionType;
      return _exhaustiveCheck;
  }
};

export default generateEmptySection;
