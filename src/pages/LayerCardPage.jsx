import React, { useRef, useState } from 'react';
import MobileScreen from '../components/MobileScreen';
import SwipeableStack from '../components/SwipeableStack';
import cardData from '../data/cardData.json';
import * as htmlToImage from 'html-to-image';
import ShareModal from '../components/ShareModal';

const LayerCardPage = () => {
    const stackRef = useRef(null);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [shareImageBlob, setShareImageBlob] = useState(null);

    const handleShare = async () => {
        const cardElement = document.getElementById('active-swipe-card');
        if (cardElement) {
            try {
                const blob = await htmlToImage.toBlob(cardElement);
                setShareImageBlob(blob);
                setIsShareModalOpen(true);
            } catch (error) {
                console.error('Failed to capture image:', error);
            }
        }
    };

    const handleCancel = () => {
        if (stackRef.current) {
            stackRef.current.swipeLeft();
        }
    };

    const handleShareComplete = () => {
        setIsShareModalOpen(false);
        if (stackRef.current) {
            stackRef.current.swipeRight();
        }
    };

    return (
        <div className="w-full h-screen bg-black flex items-center justify-center overflow-hidden">
            <MobileScreen className="flex flex-col items-center justify-end pb-10 relative">
                {/* Header */}
                <header className="absolute top-8 w-full flex flex-col items-center z-10">
                    <h1 className="text-2xl font-extrabold tracking-tight relative text-white">
                        Share your lewkk
                        <span
                            className="absolute -bottom-6 -right-6 text-xl text-purple-400 transform -rotate-6"
                            style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                            with styl
                        </span>
                    </h1>
                </header>

                {/* Main Stack */}
                <div className="w-full h-[65vh] relative z-20">
                    <SwipeableStack ref={stackRef} cards={cardData} />
                </div>

                {/* Controls */}
                <div className="flex gap-4 z-50 w-full max-w-[320px] px-4 mt-8">
                    <button
                        onClick={handleShare}
                        className="flex-1 bg-white text-black font-bold text-lg py-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-transform"
                    >
                        Share
                    </button>
                    <button
                        onClick={handleCancel}
                        className="flex-1 bg-[#222] text-white font-medium text-lg py-4 rounded-full border border-white/10 hover:bg-[#333] active:scale-95 transition-all"
                    >
                        Cancel
                    </button>
                </div>

                {/* Background Decor */}
                <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />
            </MobileScreen>

            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                imageBlob={shareImageBlob}
            />
        </div>
    );
};

export default LayerCardPage;
