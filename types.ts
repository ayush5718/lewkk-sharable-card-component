export interface Sticker {
  id: string;
  url: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  rotation: number;
  scale: number;
}

export interface LookCard {
  id: string;
  username: string;
  mainImage: string;
  backgroundTexture: string; // URL to a texture image
  caption: string;
  stickers: Sticker[];
  tags: string[];
}
