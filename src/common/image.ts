import { Binary } from "mongodb";

export interface ImageMetadata {
  id: string,
  mimetype: string,
}

export interface ImageWithData extends ImageMetadata {
  data: Binary
}