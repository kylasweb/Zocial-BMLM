import { useState, useCallback, useEffect } from 'react';

export const useWebRTC = () => {
  const [peerConnection, setPeerConnection] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const initializeWebRTC = useCallback(async () => {
    try {
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          {
            urls: process.env.VITE_TURN_SERVER,
            username: process.env.VITE_TURN_USERNAME,
            credential: process.env.VITE_TURN_CREDENTIAL
          }
        ]
      });

      pc.onicecandidate = handleICECandidate;
      pc.ontrack = handleTrackEvent;
      setPeerConnection(pc);

      return pc;
    } catch (error) {
      console.error('WebRTC initialization failed:', error);
      throw new Error('Failed to initialize WebRTC');
    }
  }, []);

  const startStream = async (constraints = { video: true, audio: true }) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setLocalStream(stream);
      stream.getTracks().forEach(track => {
        peerConnection?.addTrack(track, stream);
      });
      return stream;
    } catch (error) {
      console.error('Failed to start stream:', error);
      throw new Error('Failed to access media devices');
    }
  };

  const handleICECandidate = (event) => {
    if (event.candidate) {
      // Send the candidate to the remote peer
    }
  };

  const handleTrackEvent = (event) => {
    setRemoteStream(event.streams[0]);
  };

  const cleanup = () => {
    localStream?.getTracks().forEach(track => track.stop());
    peerConnection?.close();
  };

  useEffect(() => {
    return cleanup;
  }, []);

  return {
    initializeWebRTC,
    startStream,
    localStream,
    remoteStream,
    peerConnection
  };
};