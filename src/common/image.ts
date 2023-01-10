import { Binary } from "mongodb";

export interface ImageMetadata {
  id: string,
  mimetype: string,
  filename: string,
}

export interface ImageWithData extends ImageMetadata {
  data: Binary
}