import React, { useEffect, useRef, useState } from 'react';
import { useSocket } from '../../context/Socket/SocketContext';

const roomId = 'room1'; // Hardcoded room

const VideoChat = () => {
  const localVideoRef = useRef(null);
  const socket = useSocket();

  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteSocketIdRef = useRef(null);

  const [status, setStatus] = useState('Idle');

  useEffect(() => {
    const init = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = stream;
      localStreamRef.current = stream;

      socket.emit('join-room', roomId);

      socket.on('user-joined', async (socketId) => {
        remoteSocketIdRef.current = socketId;
        setStatus('Peer Joined');
      });

      socket.on('offer', async ({ offer, from }) => {
        remoteSocketIdRef.current = from;
        await createPeerConnection();

        await peerConnectionRef.current.setRemoteDescription(offer);
        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);
        socket.emit('answer', { answer, to: from });
        setStatus('Connected');
      });

      socket.on('answer', async ({ answer }) => {
        await peerConnectionRef.current.setRemoteDescription(answer);
        setStatus('Connected');
      });

      socket.on("ice-candidate", async ({ candidate, from }) => {
        try {
          await peerConnectionRef.current.addIceCandidate(candidate);
        } catch (err) {
          alert(err.message);
        }
      });
      
    };

    init();

    return () => {
      socket.disconnect();
      endCall();
    };
  }, []);

  const createPeerConnection = async () => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    peerConnectionRef.current = pc;

    localStreamRef.current.getTracks().forEach(track => {
      pc.addTrack(track, localStreamRef.current);
    });

    pc.onicecandidate = (event) => {
      if (event.candidate && remoteSocketIdRef.current) {
        socket.emit('ice-candidate', {
          candidate: event.candidate,
          to: remoteSocketIdRef.current,
        });
      }
    };

    pc.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };
  };

  const startCall = async () => {
    if (!remoteSocketIdRef.current) return alert('No peer available');

    await createPeerConnection();

    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);
    socket.emit('offer', { offer, to: remoteSocketIdRef.current });
    setStatus('Calling...');
  };

  const endCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    remoteVideoRef.current.srcObject = null;
    setStatus('Call Ended');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Video Chat</h1>
      <p>Status: <strong>{status}</strong></p>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <button onClick={startCall}>Start Call</button>
        <button onClick={endCall}>End Call</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <h3>You</h3>
          <video ref={localVideoRef} autoPlay muted playsInline style={{ width: '300px', border: '1px solid gray' }} />
        </div>
        <div>
          <h3>Remote</h3>
          <video ref={remoteVideoRef} autoPlay playsInline style={{ width: '300px', border: '1px solid gray' }} />
        </div>
      </div>
    </div>
  );
};

export default VideoChat;
