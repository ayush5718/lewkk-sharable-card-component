import React from 'react';

const LayeredCard = ({ background, foreground, topLayer }) => {
    return (
        <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-[32px] overflow-hidden shadow-2xl">
            {/* Background Layer - Grid */}
            <img
                src={background}
                alt="Background"
                className="block w-full h-auto relative z-0"
            />

            {/* Top Layer - Person (Fixed Size, Centered, Framed) */}
            <img
                src={topLayer}
                alt="Top Layer"
                className="absolute z-10 w-[85%] aspect-[3/4] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover border-[8px] border-white shadow-lg rotate-[-2deg]"
            />

            {/* Foreground Layer - Stickers (Overlay on top) */}
            {foreground && (
                <img
                    src={foreground}
                    alt="Foreground"
                    className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none"
                />
            )}

            {/* Bottom Left Label */}
            <div className="absolute bottom-4 left-4 z-30 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium border border-white/10">
                @Superbowl992
            </div>
        </div>
    );
};

export default LayeredCard;
