class BinaryMatrix {
  constructor(userId, level = 0) {
    this.userId = userId;
    this.leftLeg = null;
    this.rightLeg = null;
    this.level = level;
    this.extremeLeft = null;
    this.extremeRight = null;
  }

  addMember(newUserId, position) {
    // Don't add beyond 10 levels
    if (this.level >= 10) return false;

    if (position === 'left') {
      if (!this.leftLeg) {
        this.leftLeg = new BinaryMatrix(newUserId, this.level + 1);
        if (this.level === 0) this.extremeLeft = newUserId;
        return true;
      }
      return this.leftLeg.addMember(newUserId, position);
    } else {
      if (!this.rightLeg) {
        this.rightLeg = new BinaryMatrix(newUserId, this.level + 1);
        if (this.level === 0) this.extremeRight = newUserId;
        return true;
      }
      return this.rightLeg.addMember(newUserId, position);
    }
  }

  calculateSpillover() {
    let leftCount = this.leftLeg ? this.countMembers(this.leftLeg) : 0;
    let rightCount = this.rightLeg ? this.countMembers(this.rightLeg) : 0;
    return Math.min(leftCount, rightCount);
  }

  countMembers(node) {
    if (!node) return 0;
    return 1 + this.countMembers(node.leftLeg) + this.countMembers(node.rightLeg);
  }

  getLevelMembers(targetLevel) {
    if (targetLevel < 0 || targetLevel > 10) return [];
    let members = [];
    
    const traverse = (node, currentLevel) => {
      if (!node) return;
      if (currentLevel === targetLevel) {
        members.push(node.userId);
        return;
      }
      traverse(node.leftLeg, currentLevel + 1);
      traverse(node.rightLeg, currentLevel + 1);
    };

    traverse(this, 0);
    return members;
  }
}