class NetworkManager {
  constructor() {
    this.matrix = new Map();
    this.sponsorMap = new Map();
  }

  addMember(userId, sponsorId) {
    if (!this.matrix.has(sponsorId)) {
      return false;
    }

    const sponsor = this.matrix.get(sponsorId);
    const position = this.determinePosition(sponsor);
    
    if (sponsor.addMember(userId, position)) {
      this.sponsorMap.set(userId, sponsorId);
      return true;
    }
    return false;
  }

  determinePosition(sponsor) {
    // Implement binary placement logic
    const leftCount = sponsor.leftLeg ? sponsor.countMembers(sponsor.leftLeg) : 0;
    const rightCount = sponsor.rightLeg ? sponsor.countMembers(sponsor.rightLeg) : 0;
    
    return leftCount <= rightCount ? 'left' : 'right';
  }

  getDownline(userId, level) {
    const matrix = this.matrix.get(userId);
    return matrix ? matrix.getLevelMembers(level) : [];
  }

  calculateCommissions(userId) {
    const matrix = this.matrix.get(userId);
    if (!matrix) return 0;
    
    const spillover = matrix.calculateSpillover();
    // Implement commission calculation based on spillover and level
    return spillover * 10; // Example: $10 per pair
  }
}