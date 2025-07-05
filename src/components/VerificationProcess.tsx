import React, { useState, useEffect } from 'react';
import { Shield, Clock, CheckCircle, Zap, Activity } from 'lucide-react';
import PatternChallenge from './PatternChallenge';
import CognitiveChallenge from './CognitiveChallenge';
import { BehavioralAnalyzer } from '../utils/behavioral';
import { CryptoUtils } from '../utils/crypto';
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
  const [progress, setProgress] = useState(0);
  const [processingStep, setProcessingStep] = useState(0);

  useEffect(() => {
    setProgress(33);
  }, []);

  // Animate processing steps
  useEffect(() => {
    if (currentChallenge === 'processing') {
      const steps = [
        'Analyzing behavioral patterns...',
        'Computing cryptographic commitments...',
        'Generating zero-knowledge proof...',
        'Finalizing verification...'
      ];
      
      let step = 0;
      const timer = setInterval(() => {
        setProcessingStep(step);
        step++;
        if (step >= steps.length) {
          clearInterval(timer);
        }
      }, 500);

      return () => clearInterval(timer);
    }
  }, [currentChallenge]);

  const handleChallengeComplete = async (success: boolean, response: any) => {
    const result = { type: currentChallenge, success, response, timestamp: Date.now() };
    const newResults = [...challengeResults, result];
    setChallengeResults(newResults);
    
    onInteraction();

    if (currentChallenge === 'pattern') {
      setProgress(66);
      setTimeout(() => setCurrentChallenge('cognitive'), 1000);
    } else if (currentChallenge === 'cognitive') {
      setProgress(100);
      setCurrentChallenge('processing');
      
      // Process results and generate proof
      setTimeout(async () => {
        const proof = await generateProof(newResults);
        onComplete(proof);
      }, 3000);
    }
  };

  const generateProof = async (results: any[]): Promise<ZKPProof> => {
    const challengeData = results.map(r => `${r.type}:${r.success}`).join('|');
    const behavioralData = { 
      interactions: results.length,
      timings: results.map(r => r.timestamp),
      patterns: results.filter(r => r.success).length
    };

    const { proof, commitment } = await CryptoUtils.createProof(
      challengeData,
      'human_verification',
      behavioralData
    );

    // Calculate human score based on challenge success and behavioral patterns
    const successRate = results.filter(r => r.success).length / results.length;
    const humanScore = Math.min(successRate * 100, 100);

    return {
      id: CryptoUtils.generateNonce(),
      hash: proof,
      timestamp: Date.now(),
      verified: humanScore >= 70,
      humanScore
    };
  };

  const renderChallenge = () => {
    switch (currentChallenge) {
      case 'pattern':
        return (
          <PatternChallenge 
            onComplete={handleChallengeComplete}
            onInteraction={onInteraction}
          />
        );
      case 'cognitive':
        return (
          <CognitiveChallenge 
            onComplete={handleChallengeComplete}
            onInteraction={onInteraction}
          />
        );
      case 'processing':
        return (
          <div className="text-center py-12">
            <div className="relative mb-8">
              <div className="animate-spin w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap className="w-8 h-8 text-purple-400 animate-pulse" />
              </div>
              {/* Animated rings */}
              <div className="absolute inset-0 animate-ping">
                <div className="w-20 h-20 border-2 border-purple-500/20 rounded-full mx-auto"></div>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-4 text-white">Generating ZK Proof</h3>
            
            {/* Processing steps */}
            <div className="space-y-3 mb-6">
              {[
                'Analyzing behavioral patterns...',
                'Computing cryptographic commitments...',
                'Generating zero-knowledge proof...',
                'Finalizing verification...'
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
                    <div className="w-4 h-4 border border-current rounded-full animate-pulse"></div>
                  )}
                  <span>{step}</span>
                </div>
              ))}
            </div>

            {/* Live activity indicator */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>Cryptographic operations in progress...</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <div className="relative">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl shadow-lg">
              <Shield className="w-10 h-10 text-white" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl animate-pulse opacity-50"></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2 text-white">ZK Verification Protocol</h2>
          <p className="text-gray-400 text-center">
            Executing cryptographic human verification
          </p>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-300">Protocol Progress</span>
            <span className="text-sm font-medium text-gray-300">{progress}%</span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 h-3 rounded-full transition-all duration-1000 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Challenge Steps */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className={`flex flex-col items-center gap-2 text-sm transition-all duration-300 ${
            currentChallenge === 'pattern' ? 'text-purple-400 scale-110' : 
            challengeResults.length > 0 ? 'text-green-400' : 'text-gray-500'
          }`}>
            {challengeResults.length > 0 ? (
              <div className="p-2 bg-green-500/20 rounded-full">
                <CheckCircle className="w-5 h-5" />
              </div>
            ) : (
              <div className={`p-2 rounded-full border-2 ${
                currentChallenge === 'pattern' ? 'border-purple-400 bg-purple-500/10 animate-pulse' : 'border-current'
              }`}>
                <div className="w-5 h-5" />
              </div>
            )}
            <span className="font-medium">Pattern</span>
          </div>
          
          <div className={`w-8 h-0.5 transition-all duration-500 ${
            challengeResults.length > 0 ? 'bg-green-400' : 'bg-gray-600'
          }`}></div>
          
          <div className={`flex flex-col items-center gap-2 text-sm transition-all duration-300 ${
            currentChallenge === 'cognitive' ? 'text-cyan-400 scale-110' : 
            challengeResults.length > 1 ? 'text-green-400' : 'text-gray-500'
          }`}>
            {challengeResults.length > 1 ? (
              <div className="p-2 bg-green-500/20 rounded-full">
                <CheckCircle className="w-5 h-5" />
              </div>
            ) : (
              <div className={`p-2 rounded-full border-2 ${
                currentChallenge === 'cognitive' ? 'border-cyan-400 bg-cyan-500/10 animate-pulse' : 'border-current'
              }`}>
                <div className="w-5 h-5" />
              </div>
            )}
            <span className="font-medium">Cognitive</span>
          </div>
          
          <div className={`w-8 h-0.5 transition-all duration-500 ${
            challengeResults.length > 1 ? 'bg-green-400' : 'bg-gray-600'
          }`}></div>
          
          <div className={`flex flex-col items-center gap-2 text-sm transition-all duration-300 ${
            currentChallenge === 'processing' ? 'text-green-400 scale-110' : 'text-gray-500'
          }`}>
            <div className={`p-2 rounded-full border-2 ${
              currentChallenge === 'processing' ? 'border-green-400 bg-green-500/10 animate-pulse' : 'border-current'
            }`}>
              <Clock className="w-5 h-5" />
            </div>
            <span className="font-medium">ZK Proof</span>
          </div>
        </div>

        {renderChallenge()}
      </div>
    </div>
  );
};

export default VerificationProcess;