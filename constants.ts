import { LookCard } from './types';

export const MOCK_CARDS: LookCard[] = [
  {
    id: '1',
    username: '@Superbowl992',
    mainImage: 'https://picsum.photos/seed/fashion1/600/800',
    backgroundTexture: 'https://picsum.photos/seed/texture1/600/900?grayscale',
    caption: 'this is a one liner caption',
    tags: ['#ootd', '#streetwear'],
    stickers: [
      { id: 's1', url: 'https://picsum.photos/seed/hat/100/100', x: 10, y: 20, rotation: -15, scale: 1 },
      { id: 's2', url: 'https://picsum.photos/seed/pants/100/150', x: 75, y: 55, rotation: 10, scale: 1.1 },
    ]
  },
  {
    id: '2',
    username: '@artist1033',
    mainImage: 'https://picsum.photos/seed/fashion2/600/800',
    backgroundTexture: 'https://picsum.photos/seed/texture2/600/900?grayscale',
    caption: 'blue tones for the weekend',
    tags: ['#blue', '#denim'],
    stickers: [
      { id: 's3', url: 'https://picsum.photos/seed/shoe/100/100', x: 15, y: 60, rotation: 20, scale: 0.9 },
      { id: 's4', url: 'https://picsum.photos/seed/bag/100/100', x: 80, y: 20, rotation: -5, scale: 1.2 },
    ]
  },
  {
    id: '3',
    username: '@urban_walker',
    mainImage: 'https://picsum.photos/seed/fashion3/600/800',
    backgroundTexture: 'https://picsum.photos/seed/texture3/600/900?grayscale',
    caption: 'city lights and coffee nights',
    tags: ['#urban', '#night'],
    stickers: [
      { id: 's5', url: 'https://picsum.photos/seed/watch/100/100', x: 20, y: 15, rotation: 5, scale: 1 },
    ]
  },
  {
    id: '4',
    username: '@retro_vibe',
    mainImage: 'https://picsum.photos/seed/fashion4/600/800',
    backgroundTexture: 'https://picsum.photos/seed/texture4/600/900?grayscale',
    caption: 'bringing back the 90s',
    tags: ['#retro', '#90s'],
    stickers: [
      { id: 's6', url: 'https://picsum.photos/seed/cd/100/100', x: 85, y: 80, rotation: 15, scale: 0.8 },
      { id: 's7', url: 'https://picsum.photos/seed/camera/100/100', x: 5, y: 40, rotation: -10, scale: 1 },
    ]
  },
  {
    id: '5',
    username: '@minimalist_co',
    mainImage: 'https://picsum.photos/seed/fashion5/600/800',
    backgroundTexture: 'https://picsum.photos/seed/texture5/600/900?grayscale',
    caption: 'less is always more',
    tags: ['#minimal', '#clean'],
    stickers: []
  },
  {
    id: '6',
    username: '@color_pop',
    mainImage: 'https://picsum.photos/seed/fashion6/600/800',
    backgroundTexture: 'https://picsum.photos/seed/texture6/600/900?grayscale',
    caption: 'exploring new palettes',
    tags: ['#color', '#art'],
    stickers: [
      { id: 's8', url: 'https://picsum.photos/seed/paint/100/100', x: 50, y: 10, rotation: 0, scale: 1.5 },
    ]
  },
  {
    id: '7',
    username: '@neon_dreams',
    mainImage: 'https://picsum.photos/seed/fashion7/600/800',
    backgroundTexture: 'https://picsum.photos/seed/texture7/600/900?grayscale',
    caption: 'glowing through the night',
    tags: ['#neon', '#cyber'],
    stickers: [
       { id: 's9', url: 'https://picsum.photos/seed/glasses/100/100', x: 30, y: 30, rotation: 10, scale: 1.2 },
    ]
  }
];
