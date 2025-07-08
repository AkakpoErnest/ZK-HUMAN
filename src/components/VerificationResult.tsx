import React from 'react';
import { CheckCircle, XCircle, Shield, User, Cpu, Zap, Key, Hash, Copy, Check, ExternalLink, Blocks } from 'lucide-react';
import { ZKPProof } from '../types/zkp';

interface VerificationResultProps {
  proof: ZKPProof;
  onReset: () => void;
}

const VerificationResult: React.FC<VerificationResultProps> = ({ proof, onReset }) => {
  const [copiedHash, setCopiedHash] = React.useState(false);
  const [copiedProof, setCopiedProof] = React.useState(false);

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

  const copyToClipboard = async (text: string, type: 'hash' | 'proof') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'hash') {
        setCopiedHash(true);
        setTimeout(() => setCopiedHash(false), 2000);
      } else {
        setCopiedProof(true);
        setTimeout(() => setCopiedProof(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const fullProofData = {
    id: proof.id,
    hash: proof.hash,
    timestamp: proof.timestamp,
    verified: proof.verified,
    humanScore: proof.humanScore,
    zkCommitments: proof.zkCommitments,
    challenge: proof.challenge
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

        <div className="p-4 bg-gray-700/30 border border-gray-600/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Hash className="w-4 h-4" />
              ZK Proof Hash
            </span>
            <button
              onClick={() => copyToClipboard(proof.hash, 'hash')}
              className="flex items-center gap-1 px-2 py-1 bg-purple-600/20 border border-purple-500/30 rounded text-xs text-purple-400 hover:bg-purple-600/30 transition-colors"
            >
              {copiedHash ? (
                <>
                  <Check className="w-3 h-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>
          <div className="text-xs font-mono text-purple-400 break-all bg-black/20 p-2 rounded border">
            {proof.hash}
          </div>
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

        {/* Blockchain Integration Section */}
        <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Blocks className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Blockchain Ready</span>
          </div>
          <div className="text-xs text-gray-400 space-y-2">
            <p>This ZK proof can be submitted to blockchain networks:</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>Ethereum (via smart contract)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>Polygon (lower gas fees)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>zkSync (native ZK support)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Export Full Proof */}
        <div className="p-4 bg-gray-700/30 border border-gray-600/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">Full Proof Data</span>
            <button
              onClick={() => copyToClipboard(JSON.stringify(fullProofData, null, 2), 'proof')}
              className="flex items-center gap-1 px-2 py-1 bg-green-600/20 border border-green-500/30 rounded text-xs text-green-400 hover:bg-green-600/30 transition-colors"
            >
              {copiedProof ? (
                <>
                  <Check className="w-3 h-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy JSON
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-400">
            Complete proof data for blockchain submission or API verification
          </p>
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

      <div className="space-y-3">
        <button
          onClick={onReset}
          className="w-full bg-gradient-to-r from-purple-600 via-cyan-500 to-green-500 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:via-cyan-600 hover:to-green-600 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" />
          Generate New Proof
        </button>
        
        <div className="text-center">
          <a
            href="https://docs.zkhuman.dev/blockchain"
            className="inline-flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            Deploy to blockchain networks
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerificationResult;