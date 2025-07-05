// Simple cryptographic utilities for ZKP demonstration
export class CryptoUtils {
  static async generateHash(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  static generateNonce(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  static async createProof(
    challenge: string, 
    response: string, 
    behavioral: any
  ): Promise<{ proof: string; commitment: string }> {
    const nonce = this.generateNonce();
    const combinedData = `${challenge}:${response}:${JSON.stringify(behavioral)}:${nonce}`;
    const proof = await this.generateHash(combinedData);
    const commitment = await this.generateHash(proof + nonce);
    
    return { proof, commitment };
  }
}