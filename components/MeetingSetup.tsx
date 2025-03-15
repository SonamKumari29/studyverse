import { Button } from './ui/button';
import { DeviceSettings, VideoPreview, useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import Alert from './Alert';
import { useEffect, useState } from 'react';

const MeetingSetup = ({ setIsSetupComplete }) => {
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived = callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();

  if (!call) {
    throw new Error('useStreamCall must be used within a StreamCall component.');
  }

  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  if (callTimeNotArrived) {
    return (
      <Alert
        title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
      />
    );
  }

  if (callHasEnded) {
    return (
      <Alert
        title="The call has been ended by the host"
        iconUrl="/icons/call-ended.svg"
      />
    );
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-meeting-setup text-white">
      <h1 className="text-center text-3xl font-bold heading">Meeting Setup</h1>
      <div className="border border-gray-700 rounded-lg p-4 shadow-xl backdrop-blur-lg bg-opacity-50 bg-black w-full max-w-4xl">
        <div className="w-full">
          <VideoPreview className="w-full rounded-lg overflow-hidden shadow-md" />
        </div>
        <div className="flex mt-4 items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm font-semibold label">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-teal-500 border-gray-500 focus:ring-teal-500"
              checked={isMicCamToggled}
              onChange={(e) => setIsMicCamToggled(e.target.checked)}
            />
            Join with mic and camera off
          </label>
          <DeviceSettings className="text-gray-300 hover:text-teal-500 transition-colors duration-200" />
        </div>
      </div>
      <Button
        className="mt-4 rounded-full bg-teal-500 px-6 py-3 font-semibold shadow-md hover:bg-teal-400 transition-transform duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;