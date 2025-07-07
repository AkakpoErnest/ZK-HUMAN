import React, { useState, useEffect } from 'react';
import { Brain, Check, X } from 'lucide-react';

interface CognitiveChallengeProps {
  onComplete: (success: boolean, response: any) => void;
  onInteraction: () => void;
}

const CognitiveChallenge: React.FC<CognitiveChallengeProps> = ({ onComplete, onInteraction }) => {
  const [challenge, setChallenge] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    generateChallenge();
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete(false, { challenge, userAnswer: '', timeout: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const generateChallenge = () => {
    const challenges = [
      {
        type: 'simple_math',
        question: 'What is 5 + 3?',
        options: ['7', '8', '9', '10'],
        correct: 1
      },
      {
        type: 'color_recognition',
        question: 'What color do you get when you mix red and blue?',
        options: ['Green', 'Purple', 'Yellow', 'Orange'],
        correct: 1
      },
      {
        type: 'basic_logic',
        question: 'Which one is different?',
        options: ['Cat', 'Dog', 'Bird', 'Car'],
        correct: 3
      },
      {
        type: 'simple_pattern',
        question: 'What comes next: 2, 4, 6, ?',
        options: ['7', '8', '9', '10'],
        correct: 1
      },
      {
        type: 'common_knowledge',
        question: 'How many days are in a week?',
        options: ['5', '6', '7', '8'],
        correct: 2
      },
      {
        type: 'basic_shapes',
        question: 'How many sides does a triangle have?',
        options: ['2', '3', '4', '5'],
        correct: 1
      }
    ];

    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    setChallenge(randomChallenge);
  };

  const handleAnswer = (answerIndex: number) => {
    onInteraction();
    const success = answerIndex === challenge.correct;
    onComplete(success, { challenge, userAnswer: answerIndex, success });
  };

  if (!challenge) return null;

  return (
    <div className="text-center">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2 text-white">
          <Brain className="w-5 h-5 text-cyan-400" />
          Human Verification
        </h3>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <span>Time remaining:</span>
          <span className={`font-mono font-bold ${timeLeft <= 5 ? 'text-red-400' : 'text-cyan-400'}`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      <div className="bg-gray-700/30 border border-gray-600/30 rounded-lg p-6 mb-6">
        <p className="text-lg font-medium mb-4 text-white">{challenge.question}</p>
        
        <div className="grid grid-cols-1 gap-3">
          {challenge.options.map((option: string, index: number) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="p-3 bg-gray-800/50 border border-gray-600/50 rounded-lg hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-200 text-left text-white"
            >
              <span className="font-medium text-cyan-400 mr-2">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
          style={{ width: `${(timeLeft / 20) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CognitiveChallenge;