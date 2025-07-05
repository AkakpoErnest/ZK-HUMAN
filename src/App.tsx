import React, { useState, useEffect } from 'react';
import { Shield, User, Lock, Eye, EyeOff, Zap, Code, Globe, Cpu, Activity } from 'lucide-react';
import VerificationProcess from './components/VerificationProcess';
import VerificationResult from './components/VerificationResult';
import { BehavioralAnalyzer } from './utils/behavioral';
import { ZKPProof } from './types/zkp';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'verification' | 'result'>('landing');
  const [proof, setProof] = useState<ZKPProof | null>(null);
  const [behavioralAnalyzer] = useState(() => new BehavioralAnalyzer());
  const [showPrivacyDetails, setShowPrivacyDetails] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({ verifications: 0, integrations: 0, uptime: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    behavioralAnalyzer.trackMouseMove(e.clientX, e.clientY);
  };

  const handleInteraction = () => {
    behavioralAnalyzer.trackInteraction();
  };

  // Animate stats on mount
  useEffect(() => {
    const targets = { verifications: 1247832, integrations: 3421, uptime: 99.97 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setAnimatedStats({
        verifications: Math.floor(targets.verifications * easeOut),
        integrations: Math.floor(targets.integrations * easeOut),
        uptime: Math.min(targets.uptime * easeOut, targets.uptime)
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="relative p-6 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full shadow-2xl">
                <Shield className="w-16 h-16 text-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full animate-ping opacity-20"></div>
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
            
            {/* Live Stats */}
            <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6 rounded-2xl">
                <div className="flex items-center justify-center mb-2">
                  <Activity className="w-6 h-6 text-purple-400 mr-2" />
                  <span className="text-3xl font-bold text-purple-400">
                    {animatedStats.verifications.toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">Verifications Processed</p>
              </div>
              
              <div className="bg-gray-800/30 backdrop-blur-sm border border-cyan-500/20 p-6 rounded-2xl">
                <div className="flex items-center justify-center mb-2">
                  <Globe className="w-6 h-6 text-cyan-400 mr-2" />
                  <span className="text-3xl font-bold text-cyan-400">
                    {animatedStats.integrations.toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">Active Integrations</p>
              </div>
              
              <div className="bg-gray-800/30 backdrop-blur-sm border border-green-500/20 p-6 rounded-2xl">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="w-6 h-6 text-green-400 mr-2" />
                  <span className="text-3xl font-bold text-green-400">
                    {animatedStats.uptime.toFixed(2)}%
                  </span>
                </div>
                <p className="text-gray-400 text-sm">Service Uptime</p>
              </div>
            </div>
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

          {/* Use Cases */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">ZK Application Ideas</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Anonymous Voting', desc: 'Prove eligibility without revealing identity', color: 'purple' },
                { title: 'Private Credit Scoring', desc: 'Verify creditworthiness without financial exposure', color: 'cyan' },
                { title: 'Age Verification', desc: 'Prove age requirements without birth date', color: 'green' },
                { title: 'Skill-Based Matching', desc: 'Prove abilities without revealing history', color: 'yellow' },
                { title: 'Anonymous KYC', desc: 'Comply with regulations while protecting privacy', color: 'pink' },
                { title: 'Private Membership', desc: 'Access exclusive communities anonymously', color: 'indigo' }
              ].map((useCase, index) => (
                <div 
                  key={index}
                  className={`p-4 bg-gray-800/20 backdrop-blur-sm border border-${useCase.color}-500/20 rounded-lg hover:border-${useCase.color}-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-${useCase.color}-500/10`}
                >
                  <h4 className={`font-semibold text-${useCase.color}-400 mb-1`}>{useCase.title}</h4>
                  <p className="text-gray-400 text-sm">{useCase.desc}</p>
                </div>
              ))}
            </div>
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
            </div>
            <p className="text-sm text-gray-400">
              Demo execution: 30-60 seconds • No registration required • Full privacy guaranteed
            </p>
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
    </div>
  );
}

export default App;