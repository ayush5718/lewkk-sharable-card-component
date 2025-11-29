import React from 'react';
import { LookCard } from '../types';

interface CollageCardProps {
  card: LookCard;
  priority?: boolean;
}

export const CollageCard: React.FC<CollageCardProps> = ({ card, priority = false }) => {
  return (
    <div className="relative w-full h-full bg-white overflow-hidden rounded-[24px] shadow-2xl select-none">
      {/* Background Texture with overlay - simulated paper/collage base */}
      <div className="absolute inset-0 z-0">
        <img 
          src={card.backgroundTexture} 
          alt="" 
          className="w-full h-full object-cover opacity-60"
        />
        {/* Paper texture overlay */}
        <div className="absolute inset-0 bg-white/20 mix-blend-overlay" />
      </div>

      {/* Decorative Grid Lines (subtle) */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main Center Image - Polaroid style */}
      <div className="absolute inset-x-6 top-16 bottom-28 z-10 bg-white p-2 shadow-lg rotate-1 transition-transform hover:rotate-0 duration-300">
         <img 
            src={card.mainImage} 
            alt="Main look" 
            className="w-full h-full object-cover border border-gray-100"
            loading={priority ? "eager" : "lazy"}
         />
      </div>

      {/* Stickers */}
      {card.stickers.map((sticker) => (
        <div
          key={sticker.id}
          className="absolute z-20 p-0.5 bg-white/80 backdrop-blur-sm shadow-md rounded-sm transform-gpu"
          style={{
            left: `${sticker.x}%`,
            top: `${sticker.y}%`,
            transform: `rotate(${sticker.rotation}deg) scale(${sticker.scale}) translate(-50%, -50%)`,
          }}
        >
          <img 
            src={sticker.url} 
            alt="sticker" 
            className="w-16 h-16 object-contain block" 
          />
        </div>
      ))}

      {/* Handwritten Tags */}
      <div className="absolute top-8 right-6 z-20 transform rotate-6">
        {card.tags.map((tag, i) => (
          <span key={i} className="block text-blue-600/90 font-bold text-xl font-[Permanent Marker] drop-shadow-sm -mb-2">
            {tag}
          </span>
        ))}
      </div>

      {/* User Caption - Typewriter style */}
      <div className="absolute bottom-20 w-full text-center z-20 px-8">
        <p className="font-mono text-xs text-white bg-black px-2 py-1 inline-block rounded-sm tracking-wide">
          {card.caption}
        </p>
      </div>

      {/* User Handle Pill */}
      <div className="absolute bottom-5 left-5 z-30">
        <div className="bg-black/80 backdrop-blur-md text-white pl-1 pr-3 py-1 rounded-full flex items-center gap-2 shadow-lg border border-white/10">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-400 to-orange-400 flex items-center justify-center text-[10px] font-bold">
            {card.username[1].toUpperCase()}
          </div>
          <span className="text-xs font-medium tracking-wide">{card.username}</span>
        </div>
      </div>
      
      {/* Interaction Hint (Hand) */}
      <div className="absolute bottom-6 right-6 z-30 pointer-events-none">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
             <path d="M7 11L12 6L17 11M12 18V7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
      </div>
    </div>
  );
};
