export interface VerificationChallenge {
  id: string;
  type: 'pattern' | 'behavioral' | 'cognitive';
  challenge: any;
  timestamp: number;
}

export interface VerificationResponse {
  challengeId: string;
  response: any;
  behavioral: BehavioralData;
  timestamp: number;
}

export interface BehavioralData {
  mouseMovements: { x: number; y: number; timestamp: number }[];
  timings: number[];
  interactions: number;
}

export interface ZKPProof {
  id: string;
  hash: string;
  timestamp: number;
  verified: boolean;
  humanScore: number;
  zkCommitments?: {
    pattern: string;
    timing: string;
    mouse: string;
  };
  challenge?: string;
}