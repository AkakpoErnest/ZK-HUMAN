import React, { useState } from 'react';
import { Shield, User, Lock, Eye, EyeOff, Code, Book, Terminal, Github } from 'lucide-react';
import VerificationProcess from './components/VerificationProcess';
import VerificationResult from './components/VerificationResult';
import DocumentationView from './components/DocumentationView';
import { BehavioralAnalyzer } from './utils/behavioral';
import { ZKPProof } from './types/zkp';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'verification' | 'result' | 'docs'>('landing');
  const [proof, setProof] = useState<ZKPProof | null>(null);
  const [behavioralAnalyzer] = useState(() => new BehavioralAnalyzer());
  const [showPrivacyDetails, setShowPrivacyDetails] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    behavioralAnalyzer.trackMouseMove(e.clientX, e.clientY);
  };

  const handleInteraction = () => {
    behavioralAnalyzer.trackInteraction();
  };

  const handleStartVerification = () => {
    behavioralAnalyzer.reset();
    setCurrentView('verification');
    handleInteraction();
  };

  const handleVerificationComplete = (zkpProof: ZKPProof) => {
    const behavioralScore = behavioralAnalyzer.calculateHumanScore();
    const combinedScore = Math.max(zkpProof.humanScore, behavioralScore);
    
    setProof({
      ...zkpProof,
      humanScore: combinedScore,
      verified: combinedScore >= 70
    });
    setCurrentView('result');
  };

  const handleReset = () => {
    setProof(null);
    setCurrentView('landing');
    behavioralAnalyzer.reset();
  };

  const renderLanding = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black" onMouseMove={handleMouseMove}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="p-6 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full shadow-2xl">
                <Shield className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-transparent mb-6">
              zkHuman
            </h1>
            <p className="text-2xl text-gray-300 mb-4">
              Zero-Knowledge Human Verification
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
              Prove your humanity without compromising privacy. A cryptographic approach to 
              human verification using Zero Knowledge Proofs and behavioral analysis.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300">
              <div className="p-3 bg-purple-500/20 rounded-xl w-fit mb-4">
                <User className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Human Verification</h3>
              <p className="text-gray-400 leading-relaxed">
                Advanced behavioral analysis and cognitive challenges that distinguish humans from bots 
                through natural interaction patterns and reasoning abilities.
              </p>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300">
              <div className="p-3 bg-cyan-500/20 rounded-xl w-fit mb-4">
                <Shield className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Zero Knowledge Proof</h3>
              <p className="text-gray-400 leading-relaxed">
                Cryptographic proofs that verify humanity without revealing any personal information, 
                biometric data, or behavioral patterns to third parties.
              </p>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-green-500/30 transition-all duration-300">
              <div className="p-3 bg-green-500/20 rounded-xl w-fit mb-4">
                <Lock className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Privacy First</h3>
              <p className="text-gray-400 leading-relaxed">
                Complete privacy protection with cryptographic hashing, no data storage, 
                and mathematical guarantees of anonymity preservation.
              </p>
            </div>
          </div>

          {/* Privacy Architecture */}
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">ZK Privacy Architecture</h3>
              <button
                onClick={() => setShowPrivacyDetails(!showPrivacyDetails)}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                {showPrivacyDetails ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                {showPrivacyDetails ? 'Hide' : 'Show'} Technical Details
              </button>
            </div>
            
            {showPrivacyDetails && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-green-900/20 border border-green-500/30 rounded-xl">
                    <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                      <Lock className="w-5 h-5" />
                      Cryptographic Inputs
                    </h4>
                    <ul className="text-sm text-green-300 space-y-2">
                      <li>• SHA-256 behavioral pattern hashes</li>
                      <li>• Pedersen commitment schemes</li>
                      <li>• Temporal interaction signatures</li>
                      <li>• Entropy-based randomness collection</li>
                      <li>• Challenge-response cryptographic proofs</li>
                    </ul>
                  </div>
                  
                  <div className="p-6 bg-red-900/20 border border-red-500/30 rounded-xl">
                    <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Zero Knowledge Guarantees
                    </h4>
                    <ul className="text-sm text-red-300 space-y-2">
                      <li>• No personal identifiers collected</li>
                      <li>• No biometric data storage</li>
                      <li>• No device fingerprinting</li>
                      <li>• No behavioral profiling retention</li>
                      <li>• Complete anonymity preservation</li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-6 bg-purple-900/20 border border-purple-500/30 rounded-xl">
                  <h4 className="font-semibold text-purple-400 mb-3">Protocol Implementation</h4>
                  <p className="text-sm text-purple-300 leading-relaxed">
                    Our ZK-SNARK implementation combines multiple cryptographic primitives: Pedersen commitments 
                    with SHA-256 hashing create verifiable proofs of human cognition patterns. The protocol generates 
                    cryptographic commitments from behavioral entropy without revealing underlying patterns, ensuring 
                    complete privacy while maintaining verification integrity. All computations are performed client-side 
                    with only the final proof transmitted.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleStartVerification}
                className="bg-gradient-to-r from-purple-600 via-cyan-500 to-green-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-purple-700 hover:via-cyan-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
              >
                Try ZK Verification
              </button>
              <button
                onClick={() => setCurrentView('docs')}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Book className="w-5 h-5" />
                Implementation Guide
              </button>
            </div>
            <p className="text-sm text-gray-400">
              Demo execution: 30-60 seconds • No registration required • Full privacy guaranteed
            </p>
          </div>

          {/* Quick Links */}
          <div className="mt-16 flex justify-center gap-8">
            <a 
              href="#" 
              className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>Source Code</span>
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Code className="w-5 h-5" />
              <span>API Reference</span>
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors"
            >
              <Terminal className="w-5 h-5" />
              <span>Examples</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div onMouseMove={handleMouseMove}>
      {currentView === 'landing' && renderLanding()}
      {currentView === 'verification' && (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
          <VerificationProcess 
            onComplete={handleVerificationComplete}
            onMouseMove={(x, y) => behavioralAnalyzer.trackMouseMove(x, y)}
            onInteraction={handleInteraction}
          />
        </div>
      )}
      {currentView === 'result' && proof && (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
          <VerificationResult 
            proof={proof}
            onReset={handleReset}
          />
        </div>
      )}
      {currentView === 'docs' && (
        <DocumentationView onBack={() => setCurrentView('landing')} />
      )}
    </div>
  );
}

export default App;