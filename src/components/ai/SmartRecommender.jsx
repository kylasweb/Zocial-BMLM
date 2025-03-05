export default function SmartRecommender() {
  return (
    <div className="smart-recommender">
      <PersonalizedStrategy 
        userMetrics={userMetrics}
        networkTrends={networkTrends}
        marketConditions={marketConditions}
      />
      <ActionableInsights />
      <PredictiveAnalytics />
    </div>
  )
}