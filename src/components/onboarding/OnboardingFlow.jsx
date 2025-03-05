export default function OnboardingFlow() {
  return (
    <div className="onboarding-container">
      <InteractiveWalkthrough
        steps={[
          {
            target: '.wallet-module',
            content: 'Connect your wallet to start earning',
            placement: 'bottom'
          },
          {
            target: '.binary-tree',
            content: 'View your network structure and team growth',
            placement: 'right'
          }
        ]}
      />
      <ProgressTracker 
        milestones={[
          'Complete Profile',
          'First Deposit',
          'Join First Pool',
          'Make First Referral'
        ]}
      />
    </div>
  )
}