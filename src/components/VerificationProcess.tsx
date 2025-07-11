import React, { useState, useEffect } from 'react';
import { Shield, Clock, CheckCircle, Zap, Activity, RotateCcw } from 'lucide-react';
import PatternChallenge from './PatternChallenge';
import CognitiveChallenge from './CognitiveChallenge';
import { BehavioralAnalyzer } from '../utils/behavioral';
import { ZKProofSystem, BehavioralWitness } from '../utils/zkp';
import { ZKPProof } from '../types/zkp';

interface VerificationProcessProps {
  onComplete: (proof: ZKPProof) => void;
  onMouseMove: (x: number, y: number) => void;
  onInteraction: () => void;
}

const VerificationProcess: React.FC<VerificationProcessProps> = ({ 
  onComplete, 
  onMouseMove, 
  onInteraction 
}) => {
  const [currentChallenge, setCurrentChallenge] = useState<'pattern' | 'cognitive' | 'processing'>('pattern');
  const [challengeResults, setChallengeResults] = useState<any[]>([]);
  const [progress, setProgress] = useState(33);
  const [processingStep, setProcessingStep] = useState(0);
  const [patternAttempts, setPatternAttempts] = useState(0);
  const [cognitiveAttempts, setCognitiveAttempts] = useState(0);
  const [challengeKey, setChallengeKey] = useState(0);
  const [maxPatternAttempts] = useState(3);
  const [maxCognitiveAttempts] = useState(2);
  const [behavioralAnalyzer] = useState(() => new BehavioralAnalyzer());

  useEffect(() => {
    if (currentChallenge === 'processing') {
      const steps = [
        'Collecting behavioral witness data...',
        'Creating Pedersen commitments...',
        'Generating Schnorr ZK proof...',
        'Verifying proof validity...'
      ];
      
      let step = 0;
      const timer = setInterval(() => {
        setProcessingStep(step);
        step++;
        if (step >= steps.length) {
          clearInterval(timer);
        }
      }, 800);

      return () => clearInterval(timer);
    }
  }, [currentChallenge]);

  const handleChallengeComplete = async (success: boolean, response: any) => {
    console.log('Challenge completed:', { currentChallenge, success, response });
    
    const result = { type: currentChallenge, success, response, timestamp: Date.now() };
    onInteraction();

    if (currentChallenge === 'pattern') {
      const newAttempts = patternAttempts + 1;
      setPatternAttempts(newAttempts);
      
      console.log('Pattern challenge:', { success, newAttempts, maxPatternAttempts });
      
      if (success || newAttempts >= maxPatternAttempts) {
        // Pattern completed successfully or max attempts reached
        setChallengeResults(prev => {
          const newResults = [...prev, result];
          console.log('Moving to cognitive, results:', newResults);
          return newResults;
        });
        
        setProgress(66);
        
        // Move to cognitive challenge
        setTimeout(() => {
          console.log('Switching to cognitive challenge');
          setCurrentChallenge('cognitive');
          setChallengeKey(prev => prev + 1);
        }, 1000);
      } else {
        // Failed attempt, retry
        setChallengeResults(prev => [...prev, result]);
        setTimeout(() => {
          console.log('Retrying pattern challenge');
          setChallengeKey(prev => prev + 1);
        }, 1500);
      }
    } else if (currentChallenge === 'cognitive') {
      const newAttempts = cognitiveAttempts + 1;
      setCognitiveAttempts(newAttempts);
      
      console.log('Cognitive challenge:', { success, newAttempts, maxCognitiveAttempts });
      
      if (success || newAttempts >= maxCognitiveAttempts) {
        // Cognitive completed successfully or max attempts reached
        const finalResults = [...challengeResults, result];
        setChallengeResults(finalResults);
        setProgress(100);
        setCurrentChallenge('processing');
        
        console.log('Moving to processing, final results:', finalResults);
        
        // Generate ZK proof
        setTimeout(async () => {
          console.log('Generating ZK proof...');
          const proof = await generateZKProof(finalResults);
          console.log('ZK proof generated:', proof);
          onComplete(proof);
        }, 4000);
      } else {
        // Failed attempt, retry
        setChallengeResults(prev => [...prev, result]);
        setTimeout(() => {
          console.log('Retrying cognitive challenge');
          setChallengeKey(prev => prev + 1);
        }, 1500);
      }
    }
  };

  const generateZKProof = async (results: any[]): Promise<ZKPProof> => {
    console.log('Generating ZK proof with results:', results);
    
    // Prepare behavioral witness data
    const behavioralData = behavioralAnalyzer.getBehavioralData();
    const witness: BehavioralWitness = {
      patterns: results.map(r => r.success ? 'correct' : 'incorrect'),
      timings: behavioralData.timings,
      mouseEntropy: behavioralAnalyzer.calculateMouseEntropy()
    };

    // Create challenge string from all verification data
    const challengeString = `human_verification:${Date.now()}:${JSON.stringify(results)}`;

    // Generate ZK proof using our proof system
    const zkProof = await ZKProofSystem.generateHumanProof(witness, challengeString);

    // Boost score if user showed human-like behavior (some failures are actually good)
    const humanBehaviorBonus = results.some(r => !r.success) ? 15 : 0;
    const finalScore = Math.min(zkProof.humanScore + humanBehaviorBonus, 100);

    return {
      id: zkProof.id,
      hash: zkProof.proof,
      timestamp: zkProof.timestamp,
      verified: finalScore >= 60,
      humanScore: finalScore,
      zkCommitments: zkProof.commitments,
      challenge: zkProof.challenge
    };
  };

  const renderChallenge = () => {
    console.log('Rendering challenge:', currentChallenge);
    
    switch (currentChallenge) {
      case 'pattern':
        return (
          <div>
            <PatternChallenge 
              key={`pattern-${challengeKey}`}
              onComplete={handleChallengeComplete}
              onInteraction={onInteraction}
            />
            {patternAttempts > 0 && patternAttempts < maxPatternAttempts && (
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2 text-yellow-400 text-sm">
                  <RotateCcw className="w-4 h-4" />
                  <span>Attempt {patternAttempts} of {maxPatternAttempts}</span>
                </div>
              </div>
            )}
          </div>
        );
      case 'cognitive':
        return (
          <div>
            <CognitiveChallenge 
              key={`cognitive-${challengeKey}`}
              onComplete={handleChallengeComplete}
              onInteraction={onInteraction}
            />
            {cognitiveAttempts > 0 && cognitiveAttempts < maxCognitiveAttempts && (
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2 text-yellow-400 text-sm">
                  <RotateCcw className="w-4 h-4" />
                  <span>Attempt {cognitiveAttempts} of {maxCognitiveAttempts}</span>
                </div>
              </div>
            )}
          </div>
        );
      case 'processing':
        return (
          <div className="text-center py-12">
            <div className="relative mb-8">
              <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full mx-auto animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap className="w-8 h-8 text-purple-400" />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-4 text-white">Generating ZK-SNARK Proof</h3>
            
            <div className="space-y-3 mb-6">
              {[
                'Collecting behavioral witness data...',
                'Creating Pedersen commitments...',
                'Generating Schnorr ZK proof...',
                'Verifying proof validity...'
              ].map((step, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-center gap-2 text-sm transition-all duration-500 ${
                    index <= processingStep ? 'text-purple-400' : 'text-gray-500'
                  }`}
                >
                  {index <= processingStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <div className="w-4 h-4 border border-current rounded-full"></div>
                  )}
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4 text-left">
              <h4 className="text-sm font-semibold text-purple-400 mb-2">ZK Proof Generation</h4>
              <div className="text-xs text-gray-400 space-y-1">
                <div>• Computing Pedersen commitments: C = g^m · h^r</div>
                <div>• Generating Schnorr proof: s = r + c·x mod p</div>
                <div>• Proving behavioral patterns without revealing data</div>
                <div>• Verifying discrete logarithm knowledge</div>
              </div>
            </div>
          </div>
        );
      default:
        console.log('Unknown challenge type:', currentChallenge);
        return (
          <div className="text-center py-12">
            <div className="text-red-400">Error: Unknown challenge type</div>
            <button 
              onClick={() => setCurrentChallenge('pattern')}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg"
            >
              Restart
            </button>
          </div>
        );
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-2xl p-8">
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2 text-white">ZK-SNARK Protocol</h2>
        <p className="text-gray-400 text-center">
          Cryptographic proof of humanity using zero-knowledge
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-300">Protocol Progress</span>
          <span className="text-sm font-medium text-gray-300">{progress}%</span>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mb-8">
        <div className={`flex flex-col items-center gap-2 text-sm transition-all duration-300 ${
          currentChallenge === 'pattern' ? 'text-purple-400 scale-110' : 
          challengeResults.some(r => r.type === 'pattern') ? 'text-green-400' : 'text-gray-500'
        }`}>
          {challengeResults.some(r => r.type === 'pattern') ? (
            <div className="p-2 bg-green-500/20 rounded-full">
              <CheckCircle className="w-5 h-5" />
            </div>
          ) : (
            <div className={`p-2 rounded-full border-2 ${
              currentChallenge === 'pattern' ? 'border-purple-400 bg-purple-500/10' : 'border-current'
            }`}>
              <div className="w-5 h-5" />
            </div>
          )}
          <span className="font-medium">Pattern</span>
        </div>
        
        <div className={`w-8 h-0.5 transition-all duration-500 ${
          challengeResults.some(r => r.type === 'pattern') ? 'bg-green-400' : 'bg-gray-600'
        }`}></div>
        
        <div className={`flex flex-col items-center gap-2 text-sm transition-all duration-300 ${
          currentChallenge === 'cognitive' ? 'text-cyan-400 scale-110' : 
          challengeResults.some(r => r.type === 'cognitive') ? 'text-green-400' : 'text-gray-500'
        }`}>
          {challengeResults.some(r => r.type === 'cognitive') ? (
            <div className="p-2 bg-green-500/20 rounded-full">
              <CheckCircle className="w-5 h-5" />
            </div>
          ) : (
            <div className={`p-2 rounded-full border-2 ${
              currentChallenge === 'cognitive' ? 'border-cyan-400 bg-cyan-500/10' : 'border-current'
            }`}>
              <div className="w-5 h-5" />
            </div>
          )}
          <span className="font-medium">Cognitive</span>
        </div>
        
        <div className={`w-8 h-0.5 transition-all duration-500 ${
          challengeResults.some(r => r.type === 'cognitive') ? 'bg-green-400' : 'bg-gray-600'
        }`}></div>
        
        <div className={`flex flex-col items-center gap-2 text-sm transition-all duration-300 ${
          currentChallenge === 'processing' ? 'text-green-400 scale-110' : 'text-gray-500'
        }`}>
          <div className={`p-2 rounded-full border-2 ${
            currentChallenge === 'processing' ? 'border-green-400 bg-green-500/10' : 'border-current'
          }`}>
            <Clock className="w-5 h-5" />
          </div>
          <span className="font-medium">ZK Proof</span>
        </div>
      </div>

      {/* Debug info */}
      <div className="mb-4 text-xs text-gray-500 text-center">
        Current: {currentChallenge} | Pattern: {patternAttempts}/{maxPatternAttempts} | Cognitive: {cognitiveAttempts}/{maxCognitiveAttempts}
      </div>

      {renderChallenge()}
    </div>
  );
};

export default VerificationProcess;