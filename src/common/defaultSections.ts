import { v4 as uuidv4 } from "uuid";
// import { SectionTypeId, PageHeader, Header, OneImage, TwoImages, Paragraph, RichText, ParagraphImage, Contact, SubpageCarousel } from "./sections";
import { SectionTypeId, PageHeader, Header, OneImage, TwoImages, Paragraph, RichText, ParagraphImage, SubpageCarousel } from "./sections";


export const createDefaultSection = (sectionType: SectionTypeId) => {
  const id = uuidv4();
  switch (sectionType) {
    case "pageHeader":
      const pageHeader: PageHeader = {
        id,
        type: "pageHeader",
        showCard: false,
      };
      return pageHeader;

    case "header":
      const headerSection: Header = {
        id,
        type: "header",
        header: "",
      };
      return headerSection;

    case "1image":
      const oneImageSection: OneImage = {
        id,
        type: "1image",
        title: "",
        src: ""
      };
      return oneImageSection;

    case "2images":
      const twoImagesSection: TwoImages = {
        id,
        type: "2images",
        images: [
          {
            title: "",
            src: "",
          },
          {
            title: "",
            src: "",
          },
        ]
      };
      return twoImagesSection;

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

    case "paragraphImage":
      const paragraphImage: ParagraphImage = {
        id,
        type: "paragraphImage",
        paragraph: "",
        image: "",
      };
      return paragraphImage;

    case "subpageCarousel":
      const subpageCarousel: SubpageCarousel = {
        id,
        type: "subpageCarousel"
      };
      return subpageCarousel;

    // case "contact":
    //   const contact: Contact = {
    //     id,
    //     type: "contact",
    //     phone: "",
    //     email: "",
    //     address: "",
    //     socialHeader: "",
    //     social: [
    //       {
    //         icon: "facebook",
    //         href: "",
    //       },
    //       {
    //         icon: "twitter",
    //         href: "",
    //       },
    //       {
    //         icon: "linkedin",
    //         href: "",
    //       },
    //     ]
    //   };
    //   return contact;

    default:
      const _exhaustiveCheck: never = sectionType;
      return _exhaustiveCheck;
  }
};
