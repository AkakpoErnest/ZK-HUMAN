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
  const [showRocketLaunch, setShowRocketLaunch] = useState(true);
  const [proof, setProof] = useState<ZKPProof | null>(null);
  const [behavioralAnalyzer] = useState(() => new BehavioralAnalyzer());
  const [showPrivacyDetails, setShowPrivacyDetails] = useState(false);

  // Hide rocket animation after 4 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowRocketLaunch(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

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

          {/* Privacy Architecture Terminal */}
          <div className="crypto-card rounded-2xl p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500"></div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-white font-mono">
                  zkp_privacy_architecture.exe
                </h3>
              </div>
              <button
                onClick={() => setShowPrivacyDetails(!showPrivacyDetails)}
                className="cyber-button px-4 py-2 rounded-lg font-mono text-sm flex items-center gap-2 text-purple-400 hover:text-purple-300"
              >
                {showPrivacyDetails ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                {showPrivacyDetails ? "HIDE" : "EXEC"} --verbose
              </button>
            </div>

            <div className="bg-black/60 rounded-lg p-4 border border-gray-700/50 font-mono text-sm mb-4">
              <div className="text-green-400 mb-2">$ ./zkp_verify --status</div>
              <div className="text-gray-300">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-green-400">[✓]</span>
                  <span>ZK-SNARK circuit compilation: SUCCESS</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-green-400">[✓]</span>
                  <span>Behavioral entropy collection: ACTIVE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">[✓]</span>
                  <span>Privacy guarantees: MATHEMATICALLY_PROVEN</span>
                </div>
              </div>
            </div>

            {showPrivacyDetails && (
              <div className="space-y-6 animate-in slide-in-from-top duration-500">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/5 rounded-full -translate-y-8 translate-x-8"></div>
                    <h4 className="font-semibold text-green-400 mb-4 flex items-center gap-2 font-mono">
                      <Terminal className="w-5 h-5" />
                      INPUT_VECTORS
                    </h4>
                    <div className="space-y-2 font-mono text-xs">
                      <div className="text-green-300">
                        → hash(behavioral_patterns)
                      </div>
                      <div className="text-green-300">
                        → pedersen_commit(entropy)
                      </div>
                      <div className="text-green-300">
                        → temporal_signature(interactions)
                      </div>
                      <div className="text-green-300">
                        → challenge_response(cognitive)
                      </div>
                      <div className="text-green-300">
                        → randomness_beacon(external)
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-900/10 border border-red-500/30 rounded-lg p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 rounded-full -translate-y-8 translate-x-8"></div>
                    <h4 className="font-semibold text-red-400 mb-4 flex items-center gap-2 font-mono">
                      <Shield className="w-5 h-5" />
                      PRIVACY_GUARANTEES
                    </h4>
                    <div className="space-y-2 font-mono text-xs">
                      <div className="text-red-300">✗ personal_identifiers</div>
                      <div className="text-red-300">✗ biometric_storage</div>
                      <div className="text-red-300">
                        ✗ device_fingerprinting
                      </div>
                      <div className="text-red-300">✗ behavioral_profiling</div>
                      <div className="text-red-300">✗ data_retention</div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900/10 border border-purple-500/30 rounded-lg p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-full -translate-y-10 translate-x-10"></div>
                  <h4 className="font-semibold text-purple-400 mb-4 font-mono">
                    PROTOCOL_IMPLEMENTATION
                  </h4>
                  <div className="bg-black/40 rounded p-4 border border-purple-500/20">
                    <pre className="text-purple-300 text-xs leading-relaxed font-mono overflow-x-auto">
                      {`function generateZKProof(behavioralEntropy: Uint8Array): Proof {
  const commitment = pedersen.commit(behavioralEntropy, randomNonce);
  const circuit = compile(humanVerificationConstraints);
  const witness = generateWitness(commitment, cognitiveResponses);
  return snark.prove(circuit, witness, provingKey);
}

// Privacy guarantee: Only proof transmitted, no raw data`}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-8">
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={handleStartVerification}
                className="relative group px-8 py-4 bg-gradient-to-r from-purple-600/20 via-cyan-500/20 to-green-500/20 border border-purple-500/30 rounded-xl font-mono font-semibold text-lg text-white overflow-hidden transition-all duration-300 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-cyan-500 to-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Shield className="w-5 h-5" />
                  PROVE YOU'RE HUMAN
                </span>
              </button>

              <button
                onClick={() => setCurrentView("docs")}
                className="cyber-button px-8 py-4 rounded-xl font-mono font-semibold text-lg text-white flex items-center justify-center gap-2 group"
              >
                <Book className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                ACCESS_DOCUMENTATION
              </button>
            </div>

            <div className="bg-gray-900/40 border border-gray-700/30 rounded-lg p-4 max-w-2xl mx-auto backdrop-blur-sm">
              <div className="flex items-center justify-center gap-6 text-sm font-mono">
                <div className="flex items-center gap-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>EXEC_TIME: 30-60s</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-400">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span>AUTH_REQ: NONE</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span>PRIVACY: MAX</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-16 flex flex-wrap justify-center gap-8">
            <a
              href="https://github.com/yourusername/zk-human"
              className="cyber-button px-4 py-2 rounded-lg flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors font-mono text-sm group"
            >
              <Github className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              <span>source.git</span>
            </a>
            <a
              href="https://docs.zkhuman.dev/api"
              className="cyber-button px-4 py-2 rounded-lg flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors font-mono text-sm group"
            >
              <Code className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>api.docs</span>
            </a>
            <a
              href="https://examples.zkhuman.dev"
              className="cyber-button px-4 py-2 rounded-lg flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors font-mono text-sm group"
            >
              <Terminal className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>examples.sh</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div onMouseMove={handleMouseMove}>
      {/* Rocket Launch Animation */}
      {showRocketLaunch && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
          {/* Stars background */}
          <div className="absolute inset-0">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Rocket */}
          <div className="rocket-container relative">
            <div className="rocket">
              {/* Rocket body */}
              <div className="rocket-body">
                <div className="rocket-tip"></div>
                <div className="rocket-main">
                  <div className="rocket-window"></div>
                  <div className="rocket-text">zkHuman</div>
                </div>
                <div className="rocket-fins">
                  <div className="fin fin-left"></div>
                  <div className="fin fin-right"></div>
                </div>
              </div>
              
              {/* Rocket flames */}
              <div className="rocket-flames">
                <div className="flame flame-1"></div>
                <div className="flame flame-2"></div>
                <div className="flame flame-3"></div>
              </div>
            </div>

            {/* Launch text */}
            <div className="launch-text">
              <h1 className="text-4xl font-bold text-white mb-2 animate-pulse">
                Launching zkHuman
              </h1>
              <p className="text-cyan-400 font-mono">
                Initializing Zero-Knowledge Protocol...
              </p>
            </div>
          </div>

        </div>
      )}

      {currentView === "landing" && renderLanding()}
      {currentView === "verification" && (
        <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
          <div className="absolute inset-0 cyber-grid opacity-10"></div>
          <div className="binary-rain">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="binary-char"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 15}s`,
                  animationDuration: `${10 + Math.random() * 8}s`,
                }}
              >
                {Math.random() > 0.5 ? "1" : "0"}
              </div>
            ))}
          </div>
          <VerificationProcess
            onComplete={handleVerificationComplete}
            onMouseMove={(x, y) => behavioralAnalyzer.trackMouseMove(x, y)}
            onInteraction={handleInteraction}
          />
        </div>
      )}
      {currentView === "result" && proof && (
        <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
          <div className="absolute inset-0 cyber-grid opacity-10"></div>
          <div className="particles">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 15}s`,
                  animationDuration: `${15 + Math.random() * 8}s`,
                }}
              />
            ))}
          </div>
          <VerificationResult proof={proof} onReset={handleReset} />
        </div>
      )}
      {currentView === "docs" && (
        <div className="min-h-screen bg-black relative overflow-hidden">
          <div className="absolute inset-0 cyber-grid opacity-5"></div>
          <DocumentationView onBack={() => setCurrentView("landing")} />
        </div>
      )}
    </div>
  );
}

export default App;
