import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, Code, Globe, Zap, Shield, Terminal, Book, Download } from 'lucide-react';

interface DocumentationViewProps {
  onBack: () => void;
}

const DocumentationView: React.FC<DocumentationViewProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'quickstart' | 'react' | 'vanilla' | 'api'>('quickstart');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples = {
    react: `import { ZKHumanVerify } from '@zkhuman/react';

function LoginForm() {
  const handleVerification = (proof) => {
    // Proof contains: { verified, humanScore, hash, timestamp }
    if (proof.verified) {
      // Proceed with user action
      console.log('Human verified:', proof);
      // Submit form, enable features, etc.
    }
  };

  return (
    <div className="login-form">
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      
      <ZKHumanVerify
        apiKey="your-api-key"
        onComplete={handleVerification}
        theme="dark"
        size="compact"
      />
      
      <button type="submit">Login</button>
    </div>
  );
}`,
    vanilla: `<script src="https://cdn.zkhuman.com/v1/zkhuman.js"></script>

<div id="zk-human-verify"></div>
<button id="submit-btn" disabled>Submit</button>

<script>
  ZKHuman.init({
    element: '#zk-human-verify',
    apiKey: 'your-api-key',
    theme: 'dark',
    onComplete: function(proof) {
      if (proof.verified) {
        console.log('Human verified:', proof);
        document.getElementById('submit-btn').disabled = false;
      }
    }
  });
</script>`,
    api: `// Server-side verification
const response = await fetch('https://api.zkhuman.com/v1/verify', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-secret-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    proof: clientProof.hash,
    timestamp: clientProof.timestamp,
    sessionId: clientProof.id
  })
});

const result = await response.json();
// { valid: true, humanScore: 95.2, riskLevel: 'low' }

if (result.valid && result.humanScore > 70) {
  // Proceed with protected action
  console.log('Verification successful');
}`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg hover:border-purple-500/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Implementation Guide</h1>
            <p className="text-gray-400">Integrate zkHuman verification into your applications</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Navigation</h3>
              
              {/* Tab Navigation */}
              <div className="space-y-2 mb-6">
                {[
                  { id: 'quickstart', label: 'Quick Start', icon: Zap },
                  { id: 'react', label: 'React', icon: Code },
                  { id: 'vanilla', label: 'Vanilla JS', icon: Globe },
                  { id: 'api', label: 'API', icon: Terminal }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id as any)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all duration-200 text-left ${
                      activeTab === id
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-700/50">
                <h4 className="text-sm font-semibold text-gray-300 mb-3">Resources</h4>
                <div className="space-y-2">
                  <a href="#" className="flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    <Book className="w-4 h-4" />
                    Full Documentation
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    <Download className="w-4 h-4" />
                    SDK Downloads
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    <Shield className="w-4 h-4" />
                    Security Guide
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'quickstart' && (
              <div className="space-y-8">
                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Getting Started</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Get API Key</h3>
                        <p className="text-gray-400 mb-3">Sign up for a free account and get your API key from the dashboard.</p>
                        <div className="bg-gray-900/50 border border-gray-600/30 rounded-lg p-3">
                          <code className="text-sm text-cyan-300">API_KEY=zk_live_1234567890abcdef</code>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Install SDK</h3>
                        <p className="text-gray-400 mb-3">Choose your preferred integration method.</p>
                        <div className="space-y-2">
                          <div className="bg-gray-900/50 border border-gray-600/30 rounded-lg p-3">
                            <code className="text-sm text-cyan-300">npm install @zkhuman/react</code>
                          </div>
                          <div className="bg-gray-900/50 border border-gray-600/30 rounded-lg p-3">
                            <code className="text-sm text-cyan-300">yarn add @zkhuman/react</code>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Integrate Component</h3>
                        <p className="text-gray-400 mb-3">Add the verification component to your forms.</p>
                        <div className="bg-gray-900/50 border border-gray-600/30 rounded-lg p-3">
                          <code className="text-sm text-cyan-300">&lt;ZKHumanVerify apiKey="your-key" /&gt;</code>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Verify Server-side</h3>
                        <p className="text-gray-400 mb-3">Always validate proofs on your backend for security.</p>
                        <div className="bg-gray-900/50 border border-gray-600/30 rounded-lg p-3">
                          <code className="text-sm text-cyan-300">POST /api/verify with proof hash</code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Configuration Options</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Theme:</span>
                        <span className="text-purple-400">dark | light | auto</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Size:</span>
                        <span className="text-purple-400">compact | normal | large</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Timeout:</span>
                        <span className="text-purple-400">30s (default)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Language:</span>
                        <span className="text-purple-400">en | es | fr | de</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Security Features</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-400" />
                        <span>Zero data collection</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-400" />
                        <span>Cryptographic proofs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-400" />
                        <span>Behavioral analysis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-400" />
                        <span>Bot detection</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(activeTab === 'react' || activeTab === 'vanilla' || activeTab === 'api') && (
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(codeExamples[activeTab], activeTab)}
                    className="flex items-center gap-2 px-3 py-1 bg-gray-800/50 border border-gray-600/50 rounded-lg hover:border-purple-500/50 transition-colors text-sm text-gray-300"
                  >
                    {copiedCode === activeTab ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-6 text-sm text-gray-300 overflow-x-auto">
                  <code>{codeExamples[activeTab]}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationView;