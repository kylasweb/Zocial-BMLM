class AchievementManager {
  async checkAchievements(userId, action) {
    const userProgress = await this.getUserProgress(userId);
    const availableAchievements = await this.getAvailableAchievements(userId);
    
    const newlyUnlocked = availableAchievements.filter(achievement => 
      this.hasMetRequirements(userProgress, achievement)
    );

    if (newlyUnlocked.length > 0) {
      await this.processNewAchievements(userId, newlyUnlocked);
    }

    return {
      unlocked: newlyUnlocked,
      progress: this.calculateProgress(userProgress, availableAchievements)
    };
  }

  async processQuest(userId, questId) {
    const transaction = await this.startTransaction();
    
    try {
      const quest = await this.getQuestDetails(questId);
      const userProgress = await this.getQuestProgress(userId, questId);
      
      if (this.isQuestComplete(userProgress, quest)) {
        await Promise.all([
          this.awardQuestRewards(userId, quest),
          this.updateQuestStatus(userId, questId, 'COMPLETED'),
          this.unlockNextQuest(userId, quest.series),
          this.notifyUser(userId, 'QUEST_COMPLETED', { questId, rewards: quest.rewards })
        ]);
      }

      await transaction.commit();
      return { status: 'SUCCESS', progress: userProgress };
    } catch (error) {
      await transaction.rollback();
      throw new QuestProcessingError('Quest processing failed', { userId, questId, error });
    }
  }

  async generateDailyQuests(userId) {
    const userProfile = await this.getUserProfile(userId);
    const questPool = await this.getQuestPool(userProfile.level);
    
    return questPool
      .filter(quest => this.isQuestEligible(userProfile, quest))
      .map(quest => this.customizeQuest(quest, userProfile))
      .slice(0, userProfile.dailyQuestLimit);
  }
}