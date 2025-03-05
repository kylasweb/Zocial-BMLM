import { encryptData, decryptData } from '../utils/encryption';
import { generateHash } from '../utils/crypto';

class StealthStorage {
  constructor() {
    this.storageKey = 'stealth_data_' + generateHash(process.env.REACT_APP_STEALTH_KEY);
    this.cache = new Map();
  }

  async getFakeUsers() {
    try {
      const encryptedData = localStorage.getItem(this.storageKey);
      if (!encryptedData) return [];

      const decryptedData = await decryptData(encryptedData);
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error('Error retrieving fake users:', error);
      return [];
    }
  }

  async saveFakeUsers(users) {
    try {
      const encryptedData = await encryptData(JSON.stringify(users));
      localStorage.setItem(this.storageKey, encryptedData);
      this.cache.clear();
    } catch (error) {
      console.error('Error saving fake users:', error);
      throw error;
    }
  }

  async updateFakeUser(userId, updates) {
    const users = await this.getFakeUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('Fake user not found');
    }

    users[userIndex] = { ...users[userIndex], ...updates };
    await this.saveFakeUsers(users);
  }

  async deleteFakeUser(userId) {
    const users = await this.getFakeUsers();
    const filteredUsers = users.filter(u => u.id !== userId);
    await this.saveFakeUsers(filteredUsers);
  }
}

export const stealthStorage = new StealthStorage();