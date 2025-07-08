import React, { useState, useEffect } from 'react';
import { Sparkles, Check, X, Send } from 'lucide-react';

interface PatternChallengeProps {
  onComplete: (success: boolean, response: any) => void;
  onInteraction: () => void;
}

const PatternChallenge: React.FC<PatternChallengeProps> = ({ onComplete, onInteraction }) => {
  const [pattern, setPattern] = useState<number[]>([]);
  const [userPattern, setUserPattern] = useState<number[]>([]);
  const [showPattern, setShowPattern] = useState(false);
  const [gamePhase, setGamePhase] = useState<'showing' | 'input' | 'complete'>('showing');
  const [timeLeft, setTimeLeft] = useState(3);

  useEffect(() => {
    // Generate random pattern of 4-6 numbers
    const patternLength = Math.floor(Math.random() * 3) + 4;
    const newPattern = Array.from({ length: patternLength }, () => Math.floor(Math.random() * 9));
    setPattern(newPattern);
    
    // Show pattern countdown
    setShowPattern(true);
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowPattern(false);
          setGamePhase('input');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNumberClick = (number: number) => {
    if (gamePhase !== 'input') return;
    
    onInteraction();
    const newUserPattern = [...userPattern, number];
    setUserPattern(newUserPattern);
  };

  const handleSubmit = () => {
    if (userPattern.length === 0) return;
    
    onInteraction();
    const success = userPattern.length === pattern.length && 
                   userPattern.every((num, idx) => num === pattern[idx]);
    
    setGamePhase('complete');
    
    // Call onComplete immediately to prevent blank screen
    onComplete(success, { 
      pattern, 
      userPattern, 
      success,
      accuracy: success ? 100 : (userPattern.filter((num, idx) => num === pattern[idx]).length / pattern.length) * 100
    });
  };

  const handleClear = () => {
    if (gamePhase !== 'input') return;
    setUserPattern([]);
    onInteraction();
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
              ${showPattern && pattern.includes(i) ? 'ring-4 ring-yellow-400 bg-gradient-to-r from-yellow-500 to-orange-500 text-white animate-pulse' : ''}
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
          ZK Pattern Commitment
        </h3>
        <p className="text-gray-400">
          {gamePhase === 'showing' && `Memorize the sequence... ${timeLeft}s`}
          {gamePhase === 'input' && 'Click numbers to reproduce the pattern, then submit'}
          {gamePhase === 'complete' && 'Pattern commitment verified!'}
        </p>
      </div>

      {renderGrid()}

      {gamePhase === 'input' && (
        <div className="mb-6">
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-2">Your sequence ({userPattern.length} numbers):</p>
            <div className="flex justify-center gap-2 flex-wrap">
              {userPattern.map((num, idx) => (
                <span
                  key={idx}
                  className="w-8 h-8 bg-purple-600/30 border border-purple-500/50 rounded-lg flex items-center justify-center text-purple-300 font-medium"
                >
                  {num}
                </span>
              ))}
              {userPattern.length === 0 && (
                <span className="text-gray-500 italic">Click numbers above to build sequence</span>
              )}
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={handleClear}
              disabled={userPattern.length === 0}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
            <button
              onClick={handleSubmit}
              disabled={userPattern.length === 0}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-700 disabled:to-gray-700 disabled:text-gray-500 text-white rounded-lg transition-all flex items-center gap-2 font-medium"
            >
              <Send className="w-4 h-4" />
              Submit Pattern
            </button>
          </div>
        </div>
      )}

      {gamePhase === 'complete' && (
        <div className="flex items-center justify-center gap-2 text-green-400">
          <Check className="w-5 h-5" />
          <span className="font-medium">ZK commitment generated!</span>
        </div>
      )}

      {gamePhase === 'showing' && (
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400 mb-2">{timeLeft}</div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(timeLeft / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatternChallenge;