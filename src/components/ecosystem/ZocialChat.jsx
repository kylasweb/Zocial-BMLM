import React, { useEffect } from 'react';
import { useNetwork } from '../../contexts/NetworkContext';
import { useFeatureContext } from '../../contexts/FeatureContext';
import { useEncryption } from '../../hooks/useEncryption';
import { useWebRTC } from '../../hooks/useWebRTC';

export default function ZocialChat() {
  const { network } = useNetwork();
  const { isFeatureEnabled } = useFeatureContext();
  const { encryptMessage, verifyMessage } = useEncryption();
  const { initializeWebRTC } = useWebRTC();

  useEffect(() => {
    initializeWebRTC();
  }, []);

  return (
    <div className="zocial-chat">
      <RealTimeMessaging 
        features={{
          encryption: {
            enabled: true,
            type: 'end-to-end',
            blockchainVerification: true
          },
          multimedia: {
            images: true,
            videos: true,
            voice: true,
            documents: true
          },
          fileSharing: {
            maxSize: '100MB',
            allowedTypes: ['documents', 'images', 'videos', 'presentations'],
            encryption: true
          }
        }}
        onMessageSend={encryptMessage}
        onMessageReceive={verifyMessage}
      />

      <GroupChannels 
        features={{
          privateGroups: true,
          publicChannels: true,
          moderationTools: true,
          channelAnalytics: true,
          autoTranslation: true
        }}
      />

      <VideoConferencing 
        features={{
          screenSharing: true,
          recording: true,
          backgroundBlur: true,
          noiseReduction: true,
          breakoutRooms: true,
          webinarMode: true
        }}
      />

      <FileRepository 
        features={{
          versioning: true,
          collaboration: true,
          sharing: true,
          preview: true
        }}
        storage={{
          type: 'decentralized',
          encryption: true,
          backup: true
        }}
        allowedTypes={[
          'documents',
          'images',
          'videos',
          'presentations',
          'archives',
          'code'
        ]}
      />

      {isFeatureEnabled('aiAssistant') && (
        <AIAssistant 
          features={{
            translation: true,
            summarization: true,
            contentModeration: true,
            smartReplies: true
          }}
        />
      )}
    </div>
  );
}
