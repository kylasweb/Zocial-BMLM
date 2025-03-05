import { AnalyticsData } from '../types/analytics';

export async function fetchAnalyticsData(): Promise<AnalyticsData> {
  try {
    const response = await fetch('/api/analytics');
    if (!response.ok) {
      throw new Error('Failed to fetch analytics data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    throw error;
  }
}