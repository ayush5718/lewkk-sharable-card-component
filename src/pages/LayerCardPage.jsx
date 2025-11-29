import React from 'react';
import MobileScreen from '../components/MobileScreen';
import SwipeableStack from '../components/SwipeableStack';
import cardData from '../data/cardData.json';

const LayerCardPage = () => {
    return (
        <div className="w-full h-screen bg-black flex items-center justify-center overflow-hidden">
            <MobileScreen className="flex flex-col items-center justify-end pb-10">
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
                    <SwipeableStack cards={cardData} />
                </div>

                {/* Background Decor */}
                <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />
            </MobileScreen>
        </div>
    );
};

export default LayerCardPage;
