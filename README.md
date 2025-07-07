# zkHuman - Zero Knowledge Human Verification

A privacy-preserving human verification system that proves humanity without revealing personal data, built as a demonstration of Zero Knowledge Proof applications.

## 🚀 What is zkHuman?

zkHuman is a cryptographic protocol that verifies human behavior through Zero Knowledge Proofs, eliminating the need for traditional CAPTCHAs while maintaining complete privacy. The system combines behavioral biometrics, cognitive challenges, and cryptographic commitments to create verifiable proofs of humanity.

## 🔐 Zero Knowledge Architecture

- **No Personal Data**: Zero collection of identifiable information
- **Behavioral Hashing**: SHA-256 commitment schemes for interaction patterns  
- **Cryptographic Proofs**: Verifiable humanity claims without data exposure
- **Privacy-First**: Complete anonymity with mathematical guarantees

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Cryptography**: Web Crypto API with SHA-256 hashing
- **UI Components**: Lucide React icons
- **Build Tool**: Vite for fast development

## 🔧 Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/zkhuman.git
cd zkhuman

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🧪 How It Works

zkHuman uses a multi-stage verification process:

### 1. Pattern Challenge
- Tests human memory and cognitive patterns
- Users memorize and reproduce number sequences
- Multiple attempts allowed (up to 3 tries)
- Generates behavioral entropy for ZK proof

### 2. Cognitive Verification
- Simple questions that humans can easily answer
- Basic math, color recognition, common knowledge
- Designed to be accessible while filtering bots
- 20-second time limit per question

### 3. ZK-SNARK Proof Generation
- **Pedersen Commitments**: Creates cryptographic commitments to behavioral data
- **Schnorr Proofs**: Generates zero-knowledge proofs of human behavior
- **Behavioral Analysis**: Mouse movements, timing patterns, interaction entropy
- **Privacy Preservation**: No raw behavioral data is stored or transmitted

## 🔬 Technical Implementation

The system uses several cryptographic primitives:

### Commitment Schemes
```javascript
// Pedersen commitment: C = g^m · h^r mod p
const commitment = createCommitment(behavioralHash, randomNonce);
```

### Zero-Knowledge Proofs
```javascript
// Schnorr-like proof: s = r + c·x mod p
const proof = generateSchnorrProof(secrets, randomness, challenge);
```

### Behavioral Analysis
- **Mouse Entropy**: Tracks irregular human mouse movements
- **Timing Variance**: Analyzes natural human response delays
- **Pattern Recognition**: Evaluates cognitive performance without storing answers

## 🎯 Use Cases

### Web Applications
- **Login Forms**: Replace traditional CAPTCHAs
- **Registration**: Verify new user humanity
- **Comment Systems**: Prevent spam while preserving privacy
- **API Protection**: Rate limiting based on human verification

### Integration Examples

#### React Component
```jsx
import { ZKHumanVerify } from '@zkhuman/react';

function LoginForm() {
  const handleVerification = (proof) => {
    if (proof.verified && proof.humanScore >= 70) {
      // User verified as human
      proceedWithLogin();
    }
  };

  return (
    <form>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <ZKHumanVerify onComplete={handleVerification} />
      <button type="submit">Login</button>
    </form>
  );
}
```

#### Server-Side Verification
```javascript
// Verify the ZK proof on your backend
const isValid = await ZKProofSystem.verifyProof(clientProof, originalChallenge);
if (isValid && clientProof.humanScore >= 70) {
  // Proceed with protected action
}
```

## 🔐 Security Features

### Privacy Guarantees
- ✅ **Zero Data Collection**: No personal information stored
- ✅ **Behavioral Privacy**: Raw behavioral data never transmitted
- ✅ **Cryptographic Commitments**: Only mathematical proofs shared
- ✅ **Non-Reversible**: Proofs cannot be used to reconstruct original data

### Anti-Bot Protection
- ✅ **Multiple Challenge Types**: Pattern + Cognitive verification
- ✅ **Behavioral Analysis**: Human-like interaction patterns required
- ✅ **Time-Based Challenges**: Natural human response timing
- ✅ **Entropy Requirements**: Sufficient randomness in user behavior

## 📊 Verification Process

1. **Pattern Memory Test** (33% progress)
   - Display random number sequence
   - User reproduces pattern
   - Up to 3 attempts allowed
   - Generates timing and accuracy data

2. **Cognitive Challenge** (66% progress)
   - Simple human-answerable questions
   - Basic math, logic, or knowledge
   - 20-second time limit
   - Multiple choice format

3. **ZK Proof Generation** (100% progress)
   - Combine all behavioral data
   - Create Pedersen commitments
   - Generate Schnorr proof
   - Verify mathematical validity

## 🚀 Deployment

The application is optimized for static hosting:

- **Netlify**: One-click deployment
- **Vercel**: Automatic builds from Git
- **GitHub Pages**: Static hosting
- **IPFS**: Decentralized deployment

## 🤝 Contributing

We welcome contributions to improve the ZK verification system:

1. Fork the repository
2. Create a feature branch
3. Implement improvements or new verification methods
4. Add comprehensive tests
5. Submit a pull request

## 📚 Learning Resources

- [Zero Knowledge Proofs Explained](https://blog.ethereum.org/2016/12/05/zksnarks-in-a-nutshell/)
- [Pedersen Commitments](https://en.wikipedia.org/wiki/Commitment_scheme)
- [Schnorr Signatures](https://en.wikipedia.org/wiki/Schnorr_signature)
- [Behavioral Biometrics](https://en.wikipedia.org/wiki/Behavioural_biometrics)

## 🔐 Security Considerations

- All cryptographic operations use Web Crypto API
- Behavioral patterns are immediately hashed and committed
- Proofs are verifiable but not reversible
- System designed for privacy-first architecture
- No server-side storage of user data required

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🌟 Future Enhancements

- Integration with zk-SNARKs libraries (circom, snarkjs)
- Mobile-optimized touch-based challenges
- Advanced behavioral biometrics
- Integration with Web3 authentication
- Multi-language support
- Accessibility improvements
- Custom challenge difficulty levels

---

**zkHuman** demonstrates the power of Zero Knowledge Proofs in creating privacy-preserving applications. The system proves humanity without compromising user privacy, making it ideal for modern web applications that prioritize both security and user experience.