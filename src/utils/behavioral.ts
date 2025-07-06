import { BehavioralData } from '../types/zkp';

export class BehavioralAnalyzer {
  private mouseMovements: { x: number; y: number; timestamp: number }[] = [];
  private timings: number[] = [];
  private interactions: number = 0;
  private startTime: number = Date.now();

  trackMouseMove(x: number, y: number) {
    this.mouseMovements.push({ x, y, timestamp: Date.now() });
    // Keep only last 100 movements for performance
    if (this.mouseMovements.length > 100) {
      this.mouseMovements = this.mouseMovements.slice(-100);
    }
  }

  trackInteraction() {
    this.interactions++;
    this.timings.push(Date.now() - this.startTime);
  }

  getBehavioralData(): BehavioralData {
    return {
      mouseMovements: this.mouseMovements,
      timings: this.timings,
      interactions: this.interactions
    };
  }

  calculateMouseEntropy(): number {
    if (this.mouseMovements.length < 2) return 0;
    
    let entropy = 0;
    for (let i = 1; i < this.mouseMovements.length; i++) {
      const dx = this.mouseMovements[i].x - this.mouseMovements[i-1].x;
      const dy = this.mouseMovements[i].y - this.mouseMovements[i-1].y;
      entropy += Math.sqrt(dx * dx + dy * dy);
    }
    
    return entropy;
  }

  calculateHumanScore(): number {
    // Simple scoring algorithm based on behavioral patterns
    let score = 0;
    
    // Mouse movement entropy
    if (this.mouseMovements.length > 10) {
      const entropy = this.calculateMouseEntropy();
      score += Math.min(entropy / 1000, 0.3) * 100;
    }
    
    // Timing patterns
    if (this.timings.length > 1) {
      const variance = this.calculateTimingVariance();
      score += Math.min(variance / 100, 0.3) * 100;
    }
    
    // Interaction patterns
    if (this.interactions > 0) {
      score += Math.min(this.interactions * 5, 0.4) * 100;
    }
    
    return Math.min(score, 100);
  }

  private calculateTimingVariance(): number {
    if (this.timings.length < 2) return 0;
    
    const mean = this.timings.reduce((a, b) => a + b) / this.timings.length;
    const variance = this.timings.reduce((a, b) => a + (b - mean) ** 2, 0) / this.timings.length;
    
    return Math.sqrt(variance);
  }

  reset() {
    this.mouseMovements = [];
    this.timings = [];
    this.interactions = 0;
    this.startTime = Date.now();
  }
}