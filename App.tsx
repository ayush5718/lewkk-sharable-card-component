import React from 'react';
import { MOCK_CARDS } from './constants';
import { Deck } from './components/Deck';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center overflow-hidden selection:bg-purple-500 selection:text-white">
      {/* Header */}
      <header className="pt-8 pb-2 w-full flex flex-col items-center z-10">
        <h1 className="text-3xl font-extrabold tracking-tight relative">
          Share your lewkk
          <span 
            className="absolute -bottom-4 -right-8 text-2xl text-purple-400 transform -rotate-6"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            with styl
          </span>
        </h1>
      </header>

      {/* Main Interactive Area */}
      <main className="flex-1 w-full max-w-md relative flex flex-col justify-end">
        <Deck cards={MOCK_CARDS} />
      </main>
      
      {/* Background Decor (Optional ambient light) */}
      <div className="fixed top-[-20%] left-[-20%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
};

export default App;
