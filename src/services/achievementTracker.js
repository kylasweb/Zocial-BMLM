class AchievementTracker {
  async trackUserProgress(userId, action) {
    const userProgress = await this.getUserProgress(userId);
    const availableAchievements = await this.getAvailableAchievements();
    
    const newAchievements = availableAchievements.filter(achievement => {
      return this.checkAchievementCriteria(userProgress, achievement, action);
    });

    if (newAchievements.length > 0) {
      await Promise.all([
        this.awardAchievements(userId, newAchievements),
        this.distributeRewards(userId, newAchievements),
        this.updateUserProfile(userId, newAchievements),
        this.broadcastAchievement(userId, newAchievements)
      ]);
    }

    return this.calculateNextMilestone(userProgress, availableAchievements);
  }

  async broadcastAchievement(userId, achievements) {
    const user = await this.getUserDetails(userId);
    achievements.forEach(async (achievement) => {
      await this.notifyTeam(user.teamId, {
        type: 'ACHIEVEMENT_UNLOCKED',
        user: user.name,
        achievement: achievement.name
      });
    });
  }
}