import React from 'react';
import { CheckCircle, XCircle, Shield, User, Cpu, Zap, Key, Hash } from 'lucide-react';
import { ZKPProof } from '../types/zkp';

interface VerificationResultProps {
  proof: ZKPProof;
  onReset: () => void;
}

const VerificationResult: React.FC<VerificationResultProps> = ({ proof, onReset }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <User className="w-6 h-6 text-green-400" />;
    if (score >= 60) return <Shield className="w-6 h-6 text-yellow-400" />;
    return <Cpu className="w-6 h-6 text-red-400" />;
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-2xl p-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          {proof.verified ? (
            <div className="p-4 bg-green-500/20 rounded-full">
              <CheckCircle className="w-16 h-16 text-green-400" />
            </div>
          ) : (
            <div className="p-4 bg-red-500/20 rounded-full">
              <XCircle className="w-16 h-16 text-red-400" />
            </div>
          )}
        </div>
        
        <h2 className="text-2xl font-bold mb-2 text-white">
          {proof.verified ? 'ZK-SNARK Verified' : 'Verification Failed'}
        </h2>
        
        <p className="text-gray-400 mb-6">
          {proof.verified 
            ? 'Zero-knowledge proof of humanity successfully generated' 
            : 'Unable to generate valid ZK proof. Protocol retry required.'
          }
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between p-4 bg-gray-700/30 border border-gray-600/30 rounded-lg">
          <span className="text-sm font-medium text-gray-300">Humanity Score</span>
          <div className="flex items-center gap-2">
            {getScoreIcon(proof.humanScore)}
            <span className={`font-bold ${getScoreColor(proof.humanScore)}`}>
              {proof.humanScore.toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-700/30 border border-gray-600/30 rounded-lg">
          <span className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Hash className="w-4 h-4" />
            ZK Proof Hash
          </span>
          <span className="text-xs font-mono text-purple-400">
            {proof.hash.substring(0, 8)}...
          </span>
        </div>

        {proof.zkCommitments && (
          <div className="p-4 bg-gray-700/30 border border-gray-600/30 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Key className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-gray-300">Pedersen Commitments</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Pattern:</span>
                <span className="font-mono text-cyan-400">{proof.zkCommitments.pattern.substring(0, 8)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Timing:</span>
                <span className="font-mono text-cyan-400">{proof.zkCommitments.timing.substring(0, 8)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Mouse:</span>
                <span className="font-mono text-cyan-400">{proof.zkCommitments.mouse.substring(0, 8)}...</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between p-4 bg-gray-700/30 border border-gray-600/30 rounded-lg">
          <span className="text-sm font-medium text-gray-300">Timestamp</span>
          <span className="text-xs text-gray-400">
            {new Date(proof.timestamp).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">ZK-SNARK Properties</h4>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-2 bg-green-900/20 border border-green-500/30 rounded">
            <div className="flex items-center gap-1 text-green-400">
              <CheckCircle className="w-3 h-3" />
              <span>Zero knowledge</span>
            </div>
          </div>
          <div className="p-2 bg-green-900/20 border border-green-500/30 rounded">
            <div className="flex items-center gap-1 text-green-400">
              <CheckCircle className="w-3 h-3" />
              <span>Succinct proofs</span>
            </div>
          </div>
          <div className="p-2 bg-green-900/20 border border-green-500/30 rounded">
            <div className="flex items-center gap-1 text-green-400">
              <CheckCircle className="w-3 h-3" />
              <span>Non-interactive</span>
            </div>
          </div>
          <div className="p-2 bg-green-900/20 border border-green-500/30 rounded">
            <div className="flex items-center gap-1 text-green-400">
              <CheckCircle className="w-3 h-3" />
              <span>Argument of knowledge</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full bg-gradient-to-r from-purple-600 via-cyan-500 to-green-500 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:via-cyan-600 hover:to-green-600 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <Zap className="w-4 h-4" />
        Generate New Proof
      </button>
    </div>
  );
};

export default VerificationResult;