'use client';
import { useState } from 'react';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, LayoutList } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Loader from './Loader';
import EndCallButton from './EndCallButton';
import { cn } from '@/lib/utils';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();

  // for more detail about types of CallingState see: https://getstream.io/video/docs/react/ui-cookbook/ringing-call/#incoming-call-panel
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white bg-gradient-to-b from-[#121212] to-[#1e1e2f]">
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="flex w-full max-w-[1000px] items-center shadow-lg rounded-lg border border-[#3c3f51]">
          <CallLayout />
        </div>
        <div
          className={cn('h-[calc(100vh-86px)] hidden ml-2 transition-all duration-300 ease-in-out', {
            'show-block': showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      {/* video layout and call controls */}
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 bg-gradient-to-t from-[#1e1e2f] to-transparent">
        <CallControls onLeave={() => router.push(`/`)} />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-gradient-to-r from-[#3b3b5d] to-[#4c4c77] px-4 py-2 shadow-md hover:bg-gradient-to-r hover:from-[#4c4c77] hover:to-[#5c5c8e] transition-colors">
              <LayoutList size={20} className="text-[#f0f0f0] hover:text-[#a3a3f0]" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-[#3c3f51] bg-[#2a2a3d] text-[#f0f0f0] shadow-md">
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="hover:bg-gradient-to-r hover:from-[#4c4c77] hover:to-[#5c5c8e] transition-colors"
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-[#3c3f51]" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-gradient-to-r from-[#3b3b5d] to-[#4c4c77] px-4 py-2 shadow-md hover:bg-gradient-to-r hover:from-[#4c4c77] hover:to-[#5c5c8e] transition-colors">
            <Users size={20} className="text-[#f0f0f0] hover:text-[#a3a3f0]" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;