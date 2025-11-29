import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo, animate } from 'framer-motion';
import { LookCard } from '../types';
import { CollageCard } from './CollageCard';

interface DeckProps {
  cards: LookCard[];
}

interface CardItemProps {
  card: LookCard;
  index: number; // The visual index in the stack (0 = front)
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
  totalCards: number;
}

const CardItem: React.FC<CardItemProps> = ({ card, index, onSwipeRight, onSwipeLeft, totalCards }) => {
  // Motion values for the drag interaction (only active for index 0)
  const x = useMotionValue(0);
  
  // Dynamic rotation based on X drag
  // As x goes from -200 to 200, rotate goes from -18 to 18 degrees for a "loose" feel
  // clamped: false allows it to rotate more if thrown far
  const rotateDrag = useTransform(x, [-200, 200], [-18, 18], { clamp: false });
  
  // Fade out slightly when dragging extremely far
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 1, 1, 1, 0]);

  const isFront = index === 0;

  // Configuration for the messy stack visual positions
  // Cards are pushed UP (negative y) to be visible from the top, and rotated to fan out.
  // Scale is kept at 1 to maintain size consistency.
  const stackConfig = [
    { scale: 1, rotate: 0, x: 0, y: 0, zIndex: 50 },         // Front - Center
    { scale: 1, rotate: 7, x: 18, y: -12, zIndex: 40 },      // 2nd - Peeking Top Right
    { scale: 1, rotate: -6, x: -18, y: -8, zIndex: 30 },     // 3rd - Peeking Top Left
    { scale: 1, rotate: 5, x: 12, y: -18, zIndex: 20 },      // 4th - Peeking Top Right (Higher)
    { scale: 1, rotate: -4, x: -12, y: -15, zIndex: 10 },    // 5th - Peeking Top Left (Higher)
    { scale: 1, rotate: 3, x: 0, y: -22, zIndex: 5 },        // 6th - Top Center
  ];

  // Get config for this index, fallback to last one if deeper
  const config = stackConfig[index] || stackConfig[stackConfig.length - 1];

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 100;
    
    // We want the card to fly out in a "straight way" horizontally
    if (info.offset.x > swipeThreshold) {
       // Swipe Right (Share)
       // Animate off screen to the right
       await animate(x, window.innerWidth + 200, { duration: 0.4, ease: [0.32, 0.72, 0, 1] }).finished;
       onSwipeRight();
    } else if (info.offset.x < -swipeThreshold) {
       // Swipe Left (Cancel)
       // Animate off screen to the left
       await animate(x, -window.innerWidth - 200, { duration: 0.4, ease: [0.32, 0.72, 0, 1] }).finished;
       onSwipeLeft();
    }
  };

  return (
    <motion.div
      className="absolute w-[80%] aspect-[9/14] will-change-transform"
      style={{
        zIndex: config.zIndex,
      }}
      initial={false} // Skip initial mount animation if unnecessary
      animate={{
        scale: config.scale,
        x: config.x,
        y: config.y,
        rotate: config.rotate,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      {/* 
        Inner Div handles the Drag Interaction.
        We separate this so the outer div can handle the "Stack Shuffle" animations (moving from index 1 to 0)
        cleanly without fighting the drag state.
      */}
      <motion.div
         className="w-full h-full relative cursor-grab active:cursor-grabbing touch-none"
         style={{
            x: isFront ? x : 0, // Only bind motion value if front
            rotate: isFront ? rotateDrag : 0, // Only tilt if front
            opacity: isFront ? opacity : 1
         }}
         drag={isFront ? "x" : false} // Lock drag to X axis as requested "straight way"
         dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
         dragElastic={0.6} // Rubber band effect
         onDragEnd={isFront ? handleDragEnd : undefined}
         whileTap={isFront ? { scale: 1.01 } : undefined}
      >
         <CollageCard card={card} priority={isFront} />
      </motion.div>
    </motion.div>
  );
};


export const Deck: React.FC<DeckProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Showing 6 cards to emphasize the messy pile effect
  const visibleCount = 6; 
  const cardsToRender = cards.slice(currentIndex, currentIndex + visibleCount);

  const handleSwipeRight = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, cards.length));
  };

  const handleSwipeLeft = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, cards.length));
  };

  if (currentIndex >= cards.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[65vh] w-full text-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6 font-['Permanent_Marker'] text-purple-400 rotate-[-5deg]">That's a wrap!</h2>
          <button 
            onClick={() => setCurrentIndex(0)}
            className="px-10 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            Start Over
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-end h-full w-full pb-10">
      
      {/* Card Container */}
      <div className="relative w-full max-w-md h-[65vh] flex items-center justify-center perspective-1000">
        <AnimatePresence>
          {cardsToRender.map((card, index) => (
             <CardItem 
                key={card.id}
                card={card}
                index={index}
                totalCards={cards.length}
                onSwipeRight={handleSwipeRight}
                onSwipeLeft={handleSwipeLeft}
             />
          ))}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mt-8 z-50 w-full max-w-sm px-10">
        <button
          onClick={handleSwipeRight}
          className="flex-1 bg-white text-black font-bold text-lg py-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-transform"
        >
          Share
        </button>
        <button
          onClick={handleSwipeLeft}
          className="flex-1 bg-[#222] text-white font-medium text-lg py-4 rounded-full border border-white/10 hover:bg-[#333] active:scale-95 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};