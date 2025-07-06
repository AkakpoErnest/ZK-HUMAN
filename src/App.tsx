import React, { useState } from "react";
import {
  Shield,
  User,
  Lock,
  Eye,
  EyeOff,
  Code,
  Book,
  Terminal,
  Github,
} from "lucide-react";
import VerificationProcess from "./components/VerificationProcess";
import VerificationResult from "./components/VerificationResult";
import DocumentationView from "./components/DocumentationView";
import { BehavioralAnalyzer } from "./utils/behavioral";
import { ZKPProof } from "./types/zkp";

function App() {
  const [currentView, setCurrentView] = useState<
    "landing" | "verification" | "result" | "docs"
  >("landing");
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
    setCurrentView("verification");
    handleInteraction();
  };

  const handleVerificationComplete = (zkpProof: ZKPProof) => {
    const behavioralScore = behavioralAnalyzer.calculateHumanScore();
    const combinedScore = Math.max(zkpProof.humanScore, behavioralScore);

    setProof({
      ...zkpProof,
      humanScore: combinedScore,
      verified: combinedScore >= 70,
    });
    setCurrentView("result");
  };

  const handleReset = () => {
    setProof(null);
    setCurrentView("landing");
    behavioralAnalyzer.reset();
  };

  const renderLanding = () => (
    <div
      className="min-h-screen bg-black relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute inset-0 hex-pattern"></div>

      {/* Binary Rain Animation */}
      <div className="binary-rain">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="binary-char"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </div>
        ))}
      </div>

      {/* Floating Particles */}
      <div className="particles">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${20 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="relative p-8 floating">
                <div className="absolute inset-0 neon-purple rounded-full blur-sm opacity-60"></div>
                <div className="relative p-6 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 rounded-full border border-purple-500/30 backdrop-blur-xl lock-animation">
                  <Shield className="w-16 h-16 text-purple-300" />
                </div>
                {/* Rotating hex border */}
                <div className="absolute inset-0 border-2 border-transparent rounded-full">
                  <div
                    className="absolute inset-0 rounded-full border-2 border-purple-500/20 animate-spin"
                    style={{ animationDuration: "8s" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="relative mb-8">
              <h1 className="text-8xl md:text-9xl font-bold font-mono tracking-wider mb-4 relative">
                <span className="gradient-text glitch" data-text="zkHuman">
                  zkHuman
                </span>
              </h1>
              {/* Scan line effect */}
              <div className="absolute inset-0 scan-line pointer-events-none"></div>
            </div>

            <div className="mb-6">
              <p className="text-2xl md:text-3xl text-cyan-300 font-mono mb-2 tracking-wide">
                &gt; Zero-Knowledge Human Verification
              </p>
              <div className="flex justify-center items-center gap-2 text-green-400 font-mono text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>SYSTEM_STATUS: ONLINE</span>
              </div>
            </div>

            <p className="text-lg text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Cryptographically prove your humanity without exposing personal
              data. Advanced ZK-SNARK protocols combined with behavioral entropy
              analysis ensure complete privacy while maintaining verification
              integrity.
            </p>

            {/* Technical Stats */}
            <div className="flex flex-wrap justify-center gap-4 text-sm font-mono">
              <div className="bg-green-900/20 border border-green-500/30 px-3 py-1 rounded text-green-300">
                SHA-256 SECURED
              </div>
              <div className="bg-purple-900/20 border border-purple-500/30 px-3 py-1 rounded text-purple-300">
                ZK-SNARK VERIFIED
              </div>
              <div className="bg-cyan-900/20 border border-cyan-500/30 px-3 py-1 rounded text-cyan-300">
                PRIVACY GUARANTEED
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="crypto-card rounded-2xl p-8 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="p-4 bg-purple-500/10 rounded-xl w-fit mb-6 relative">
                  <User className="w-8 h-8 text-purple-400" />
                  <div className="absolute inset-0 bg-purple-500/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white font-mono tracking-wide">
                  &gt; Human Verification
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Advanced behavioral entropy analysis and cognitive pattern
                  recognition. Neural pathway verification through temporal
                  interaction signatures and mathematical proof generation.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-mono text-purple-400">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
                  <span>COGNITIVE_ANALYSIS: ACTIVE</span>
                </div>
              </div>
            </div>

            <div className="crypto-card rounded-2xl p-8 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="p-4 bg-cyan-500/10 rounded-xl w-fit mb-6 relative">
                  <Shield className="w-8 h-8 text-cyan-400" />
                  <div className="absolute inset-0 bg-cyan-500/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white font-mono tracking-wide">
                  &gt; Zero Knowledge Proof
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Cryptographic commitment schemes with Pedersen hashing.
                  ZK-SNARK implementations ensuring verifiable computation
                  without data revelation or identity exposure.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span>ZK_CIRCUIT: COMPILED</span>
                </div>
              </div>
            </div>

            <div className="crypto-card rounded-2xl p-8 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="p-4 bg-green-500/10 rounded-xl w-fit mb-6 relative">
                  <Lock className="w-8 h-8 text-green-400" />
                  <div className="absolute inset-0 bg-green-500/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white font-mono tracking-wide">
                  &gt; Privacy Protocol
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Complete anonymity preservation through cryptographic hashing.
                  Zero data retention with mathematical guarantees of
                  information-theoretic privacy protection.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-mono text-green-400">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span>PRIVACY_LEVEL: MAXIMUM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Architecture */}
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">
                ZK Privacy Architecture
              </h3>
              <button
                onClick={() => setShowPrivacyDetails(!showPrivacyDetails)}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                {showPrivacyDetails ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
                {showPrivacyDetails ? "Hide" : "Show"} Technical Details
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
                  <h4 className="font-semibold text-purple-400 mb-3">
                    Protocol Implementation
                  </h4>
                  <p className="text-sm text-purple-300 leading-relaxed">
                    Our ZK-SNARK implementation combines multiple cryptographic
                    primitives: Pedersen commitments with SHA-256 hashing create
                    verifiable proofs of human cognition patterns. The protocol
                    generates cryptographic commitments from behavioral entropy
                    without revealing underlying patterns, ensuring complete
                    privacy while maintaining verification integrity. All
                    computations are performed client-side with only the final
                    proof transmitted.
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
                onClick={() => setCurrentView("docs")}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Book className="w-5 h-5" />
                Implementation Guide
              </button>
            </div>
            <p className="text-sm text-gray-400">
              Demo execution: 30-60 seconds • No registration required • Full
              privacy guaranteed
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
      {currentView === "landing" && renderLanding()}
      {currentView === "verification" && (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
          <VerificationProcess
            onComplete={handleVerificationComplete}
            onMouseMove={(x, y) => behavioralAnalyzer.trackMouseMove(x, y)}
            onInteraction={handleInteraction}
          />
        </div>
      )}
      {currentView === "result" && proof && (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
          <VerificationResult proof={proof} onReset={handleReset} />
        </div>
      )}
      {currentView === "docs" && (
        <DocumentationView onBack={() => setCurrentView("landing")} />
      )}
    </div>
  );
}

export default App;
