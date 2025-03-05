export default function ZocialNetwork() {
  return (
    <div className="zocial-network">
      <CommunityFeed />
      <UserProfiles 
        features={{
          achievements: true,
          badges: true,
          activityHistory: true,
          reputationScore: true
        }}
      />
      <ForumSystem
        categories={[
          'Crypto Discussion',
          'Trading Strategies',
          'Technical Analysis',
          'Community Projects'
        ]}
      />
      <GroupManagement />
    </div>
  )
}