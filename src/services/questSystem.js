class QuestSystem {
  async processUserAction(userId, action) {
    const activeQuests = await this.getUserActiveQuests(userId);
    const eligibleQuests = await this.filterEligibleQuests(userId, action);
    
    const updates = await Promise.all([
      this.updateQuestProgress(userId, activeQuests, action),
      this.assignNewQuests(userId, eligibleQuests)
    ]);

    const completedQuests = updates[0].filter(q => q.status === 'COMPLETED');
    if (completedQuests.length > 0) {
      await this.processQuestRewards(userId, completedQuests);
    }

    return {
      questUpdates: updates[0],
      newQuests: updates[1],
      rewards: completedQuests.map(q => q.rewards)
    };
  }

  async updateQuestProgress(userId, quests, action) {
    return Promise.all(quests.map(async quest => {
      const progress = await this.calculateQuestProgress(quest, action);
      
      if (progress.completed) {
        await this.completeQuest(userId, quest.id);
        return { ...quest, status: 'COMPLETED', rewards: quest.rewards };
      }

      await this.saveQuestProgress(userId, quest.id, progress);
      return { ...quest, progress };
    }));
  }

  async processQuestRewards(userId, completedQuests) {
    const rewards = completedQuests.flatMap(quest => quest.rewards);
    const processor = new RewardProcessor();

    await processor.batchProcess(rewards.map(reward => ({
      userId,
      type: reward.type,
      amount: reward.amount,
      source: 'QUEST',
      metadata: { questId: reward.questId }
    })));
  }
}