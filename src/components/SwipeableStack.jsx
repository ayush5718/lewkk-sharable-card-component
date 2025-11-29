import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence, animate } from 'framer-motion';
import LayeredCard from './LayeredCard';

const SwipeableStack = ({ cards: initialCards }) => {
    const [cards, setCards] = useState(initialCards);

    const removeCard = (id) => {
        setCards((prev) => prev.filter((card) => card.id !== id));
    };

    // Configuration for the messy stack visual positions
    const stackConfig = [
        { scale: 1, rotate: 0, x: 0, y: 0, zIndex: 50 },         // Front - Center
        { scale: 1, rotate: 8, x: 0, y: 0, zIndex: 40 },      // 2nd - Peeking Top Right
        { scale: 1, rotate: -8, x: 0, y: 0, zIndex: 30 },     // 3rd - Peeking Top Left
        { scale: 1, rotate: 5, x: 0, y: 0, zIndex: 20 },      // 4th - Peeking Top Right (Higher)
        { scale: 1, rotate: -4, x: 0, y: 0, zIndex: 10 },    // 5th - Peeking Top Left (Higher)
        { scale: 1, rotate: 3, x: 0, y: 0, zIndex: 5 },        // 6th - Top Center
    ];

    const handleSwipeRight = async () => {
        // Logic to animate top card right and remove
        if (cards.length > 0) {
            const topCard = cards[0];
            removeCard(topCard.id);
        }
    };

    const handleSwipeLeft = async () => {
        // Logic to animate top card left and remove
        if (cards.length > 0) {
            const topCard = cards[0];
            removeCard(topCard.id);
        }
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-end pb-12">
            <div className="relative w-full h-[600px] flex items-center justify-center perspective-1000 z-20 mb-8">
                <AnimatePresence>
                    {cards.map((card, index) => {
                        // Determine the visual index (0 is front, 1 is behind, etc.)
                        const visualIndex = index;

                        // Only render up to 3 cards for performance
                        if (visualIndex >= 3) return null;

                        const config = stackConfig[visualIndex] || stackConfig[stackConfig.length - 1];

                        return (
                            <Card
                                key={card.id}
                                card={card}
                                index={visualIndex}
                                config={config}
                                onRemove={() => removeCard(card.id)}
                            />
                        );
                    })}
                </AnimatePresence>

                {cards.length === 0 && (
                    <div className="text-white text-center p-4 z-50">
                        <h2 className="text-xl font-bold mb-2">No more cards!</h2>
                        <button
                            onClick={() => setCards(initialCards)}
                            className="px-4 py-2 bg-white text-black rounded-full font-medium"
                        >
                            Reset Stack
                        </button>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="flex gap-4 z-50 w-full max-w-[320px] px-4">
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

const Card = ({ card, index, config, onRemove }) => {
    const x = useMotionValue(0);
    const rotateDrag = useTransform(x, [-200, 200], [-18, 18]);
    const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 1, 1, 1, 0]);

    const isFront = index === 0;

    const handleDragEnd = async (event, info) => {
        const swipeThreshold = 100;
        if (info.offset.x > swipeThreshold) {
            await animate(x, 500, { duration: 0.4 }).finished;
            onRemove();
        } else if (info.offset.x < -swipeThreshold) {
            await animate(x, -500, { duration: 0.4 }).finished;
            onRemove();
        }
    };

    return (
        <motion.div
            className="absolute w-full flex items-center justify-center"
            style={{
                zIndex: config.zIndex,
            }}
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
            <motion.div
                className="relative cursor-grab active:cursor-grabbing touch-none"
                style={{
                    x: isFront ? x : 0,
                    rotate: isFront ? rotateDrag : 0,
                    opacity: isFront ? opacity : 1
                }}
                drag={isFront ? "x" : false}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.6}
                onDragEnd={isFront ? handleDragEnd : undefined}
                whileTap={isFront ? { scale: 1.01 } : undefined}
            >
                <LayeredCard
                    background={card.background}
                    foreground={card.foreground}
                    topLayer={card.topLayer}
                />
            </motion.div>
        </motion.div>
    );
};

export default SwipeableStack;
