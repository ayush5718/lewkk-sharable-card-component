import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ShareModal = ({ isOpen, onClose, imageBlob }) => {
    const handleShare = async () => {
        if (!imageBlob) return;

        try {
            const file = new File([imageBlob], 'lewkk-share.png', { type: 'image/png' });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: 'Check out my lewkk!',
                    text: 'Shared from Styl',
                });
            } else {
                // Fallback for desktop or unsupported browsers
                const url = URL.createObjectURL(imageBlob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'lewkk-share.png';
                a.click();
                URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-[#1a1a1a] w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl border border-white/10"
                    >
                        <div className="p-6 flex flex-col items-center gap-6">
                            <h3 className="text-white text-xl font-bold">Ready to Share?</h3>

                            {imageBlob && (
                                <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden shadow-lg border border-white/5">
                                    <img
                                        src={URL.createObjectURL(imageBlob)}
                                        alt="Share Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            <div className="flex flex-col w-full gap-3">
                                <button
                                    onClick={handleShare}
                                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all"
                                >
                                    Share to Instagram Stories
                                </button>
                                <button
                                    onClick={onClose}
                                    className="w-full py-4 bg-[#333] text-white font-medium rounded-xl hover:bg-[#444] active:scale-95 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ShareModal;
