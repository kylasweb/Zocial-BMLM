class MatrixBalancer {
  async balanceMatrix(userId) {
    const legs = await this.getLegCounts(userId);
    
    if (Math.abs(legs.left - legs.right) > 3) {
      await this.redistributeMembers({
        userId,
        fromLeg: legs.left > legs.right ? 'left' : 'right',
        toLeg: legs.left > legs.right ? 'right' : 'left',
        count: Math.floor(Math.abs(legs.left - legs.right) / 2)
      });
      
      await this.notifyUser(userId, 'Matrix auto-balanced to optimize earnings');
    }
  }

  async redistributeMembers({ userId, fromLeg, toLeg, count }) {
    const membersToMove = await this.getWeakestMembers(userId, fromLeg, count);
    return await this.moveMembersToLeg(membersToMove, toLeg);
  }
}