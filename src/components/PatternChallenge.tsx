import React, { useState, useEffect } from 'react';
import { Sparkles, Check, X } from 'lucide-react';

interface PatternChallengeProps {
  onComplete: (success: boolean, response: any) => void;
  onInteraction: () => void;
}

const PatternChallenge: React.FC<PatternChallengeProps> = ({ onComplete, onInteraction }) => {
  const [pattern, setPattern] = useState<number[]>([]);
  const [userPattern, setUserPattern] = useState<number[]>([]);
  const [showPattern, setShowPattern] = useState(false);
  const [gamePhase, setGamePhase] = useState<'showing' | 'input' | 'complete'>('showing');

  useEffect(() => {
    // Generate random pattern of 4-6 numbers
    const patternLength = Math.floor(Math.random() * 3) + 4;
    const newPattern = Array.from({ length: patternLength }, () => Math.floor(Math.random() * 9));
    setPattern(newPattern);
    
    // Show pattern for 3 seconds
    setShowPattern(true);
    setTimeout(() => {
      setShowPattern(false);
      setGamePhase('input');
    }, 3000);
  }, []);

  const handleNumberClick = (number: number) => {
    onInteraction();
    const newUserPattern = [...userPattern, number];
    setUserPattern(newUserPattern);

    if (newUserPattern.length === pattern.length) {
      const success = newUserPattern.every((num, idx) => num === pattern[idx]);
      setGamePhase('complete');
      setTimeout(() => {
        onComplete(success, { pattern, userPattern: newUserPattern });
      }, 1000);
    }
  };

  const renderGrid = () => {
    return (
      <div className="grid grid-cols-3 gap-3 mb-6">
        {Array.from({ length: 9 }, (_, i) => (
          <button
            key={i}
            onClick={() => handleNumberClick(i)}
            disabled={gamePhase !== 'input'}
            className={`
              w-16 h-16 rounded-xl font-bold text-xl transition-all duration-300
              ${gamePhase === 'input' 
                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white hover:scale-105 shadow-lg border border-purple-500/30' 
                : 'bg-gray-700 text-gray-500 cursor-not-allowed border border-gray-600/30'
              }
              ${showPattern && pattern.includes(i) ? 'ring-4 ring-yellow-400 bg-gradient-to-r from-yellow-500 to-orange-500 text-white' : ''}
            `}
          >
            {i}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="text-center">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2 text-white">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          Pattern Memory Protocol
        </h3>
        <p className="text-gray-400">
          {gamePhase === 'showing' && 'Memorize the highlighted sequence...'}
          {gamePhase === 'input' && 'Reproduce the pattern sequence'}
          {gamePhase === 'complete' && 'Pattern verification complete!'}
        </p>
      </div>

      {renderGrid()}

      {gamePhase === 'input' && (
        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-2">Current sequence:</p>
          <div className="flex justify-center gap-2">
            {userPattern.map((num, idx) => (
              <span
                key={idx}
                className="w-8 h-8 bg-purple-600/30 border border-purple-500/50 rounded-lg flex items-center justify-center text-purple-300 font-medium"
              >
                {num}
              </span>
            ))}
          </div>
        </div>
      )}

      {gamePhase === 'complete' && (
        <div className="flex items-center justify-center gap-2 text-green-400">
          <Check className="w-5 h-5" />
          <span className="font-medium">Pattern commitment verified!</span>
        </div>
      )}
    </div>
  );
};

export default PatternChallenge;