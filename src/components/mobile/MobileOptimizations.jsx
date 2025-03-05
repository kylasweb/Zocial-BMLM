export default function MobileOptimizations() {
  return (
    <div className="mobile-optimizations">
      <GestureControls />
      <OfflineCapabilities 
        features={['transaction-queue', 'data-sync']}
      />
      <BiometricAuth 
        methods={['fingerprint', 'faceId']}
      />
    </div>
  )
}